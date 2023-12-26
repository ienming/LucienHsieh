<script setup>
import { onMounted, ref, inject, onBeforeUnmount, computed, nextTick } from "vue";
import Symbol from "./Symbol.vue";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI)

const lang = inject("lang")

const props = defineProps(['title', 'info'])
const emits = defineEmits(['hover', 'leave'])
const coverImg = new URL(`../assets/cover_${props.title}.png`, import.meta.url).href

const usingMobile = inject("usingMobile")
const canvasRatio = computed(()=>{
    if (usingMobile.value){
        return 1.3
    }else return 1.2
})
const [canvasWidth, canvasHeight] = [
    window.innerHeight/canvasRatio.value,
    window.innerHeight/canvasRatio.value]
const canvas = ref(null)

// PIXI app only for desktop
let app;
if (!usingMobile.value){
    app = new PIXI.Application({
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: usingMobile.value ? 2 * window.devicePixelRatio : 1,
        width: canvasWidth,
        height: canvasHeight
    });
    
    const container = new PIXI.Container();
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2.5;
    container.onmousemove = (evt) => {
        const [mouseX, mouseY] = [evt.screenX, evt.screenY]
        const [spriteOriX, spriteOriY] = [sprite.x+canvasWidth/2, sprite.y+canvasHeight/2]
        const attractionRadius = 200
        const dist = Math.sqrt(Math.pow(mouseX - spriteOriX, 2) + Math.pow(mouseY - spriteOriY, 2))
        if (dist < attractionRadius){
            let [skew_x, skew_y] = [5, 5]
            if (mouseX > spriteOriX){
                skew_x = skew_x*-1
            }
            if (mouseY < spriteOriY){
                skew_y = skew_y*-1
            }
            gsap.to(maskGraphic, {
                pixi: {
                    skewX: skew_x,
                    skewY: skew_y
                },
                duration: 1
            });
            if (!usingMobile.value){
                gsap.to(shadow, {
                    pixi: {
                        skewX: skew_x,
                        skewY: skew_y,
                    },
                    duration: 1
                });
            }
        }else{
            gsap.to(maskGraphic, {
                pixi: {
                    skewX: 0,
                    skewY: 0
                },
                duration: 1
            });
            if (!usingMobile.value){
                gsap.to(shadow, {
                    pixi: {
                        skewX: 0,
                        skewY: 0
                    },
                    duration: 1
                });
            }
        }
    }
    app.stage.addChild(container);
    
    // Mask
    const maskGraphic = new PIXI.Graphics();
    container.addChild(maskGraphic)
    maskGraphic.lineStyle(0);
    maskGraphic.beginFill(0x8bc5ff, 0.4);
    drawShape(maskGraphic)
    
    function drawShape(el, offsetX=0, offsetY=0){
        const size = (window.innerHeight/canvasRatio.value)/3
        el.drawEllipse(offsetX, offsetY, size, size)
        el.endFill()
    }
    
    // Noise shadow
    let shadow
    if (!usingMobile.value){
        let noiseFilter = new PIXI.NoiseFilter(0.9)
        let blurFilter = new PIXI.BlurFilter(32, 6)
        shadow = new PIXI.Graphics();
        let [offsetX, offsetY] = [25, 40]
        shadow.beginFill('0x244d69');
        shadow.alpha = 0.3;
        drawShape(shadow, offsetX, offsetY)
        shadow.filters = [blurFilter, noiseFilter]
        container.addChild(shadow);
        
        setInterval(() => {
            noiseFilter.seed = Math.random();
          }, 50); 
    }
    
    // Project cover
    let sprite
    PIXI.Assets.add({alias: `cover_${props.title}`, 'src': coverImg})
    const texturePromise = PIXI.Assets.load(`cover_${props.title}`, (progress)=>{console.log(progress)})
    texturePromise.then((resolvedTexture) => {
        sprite = PIXI.Sprite.from(resolvedTexture)
        sprite.anchor.set(0.5);
        sprite.scale.set(canvasWidth / (sprite.width - 200))
        sprite.mask = maskGraphic;
        sprite.eventMode = 'static'
        sprite
            .on('pointerdown', ()=>{
                viewProject()
            })
            .on('pointerover', () => {
                emits('hover')
            })
            .on('pointerout', () => {
                emits('leave')
            })
        container.addChild(sprite);
    })
}

function viewProject(){
    if (usingMobile.value){
        return
    }else{
        window.open(props.info.url.demo, '_blank')
    }
}

function useCSSCover(){
    // Using CSS to display project cover image
    // for phone due to some bugs found in iOS new version
    // 2023.12.26
    canvas.value.style['width'] = canvasWidth+'px';
    canvas.value.style['height'] = canvasHeight+'px';
    canvas.value.classList.add('p-20');

    const coverEl = document.createElement("div");
    canvas.value.appendChild(coverEl);

    coverEl.style['background-image'] = `url(${coverImg})`;
    coverEl.classList.add('h-full', 'rounded-full', 'bg-cover', 'bg-center');
}

onMounted(()=>{
    if (!usingMobile.value){
        canvas.value.appendChild(app.view)
        nextTick(()=>{
            canvas.value.querySelector("canvas").style['touch-action'] = 'auto'
        })
    }else{
        nextTick(()=>{
            useCSSCover()
        })
    }
})

onBeforeUnmount(()=>{
    if (app){
        app.destroy(true)
    }
})
</script>

<template>
    <section class="relative">
        <div ref="canvas"></div>
        <div class="absolute bottom-14 md:bottom-24 pb-2 lg:pb-8 w-9/12 txt-slot-hover">
            <div class="flex flex-col items-start gap-2 lg:gap-3">
                <div class="flex gap-2">
                    <Symbol v-for="c of info.cate" :name="c" :key="info.title+'_'+c"></Symbol>
                </div>
                <h2 class="text-lg lg:text-2xl p-1 lg:p-4 txt-slot-container bg-light border border-dark"
                :style="usingMobile ? {'--slot-offset': 'calc(-113% + 0.25rem*-1)'} : {'--slot-offset': 'calc(-113% + 1rem*-1)'}">
                    <div v-for="n of 2" class="txt-slot flex flex-wrap items-center">
                        <a :href="info.url.demo" target="_blank" class="font-serif font-bold">{{ info.name.zh }}</a>
                        <a :href="info.url.demo" target="_blank" class="font-light text-sm ps-1 lg:ps-2">{{ info.name.en }}</a>
                    </div>
                </h2>
                <div class="flex gap-2 text-light">
                    <a :href="info.url.demo"
                    :class="usingMobile ? '':'hidden'"
                    v-if="Object.prototype.hasOwnProperty.call(info.url, 'demo')" target="_blank"
                    class="flex gap-1 items-center py-1 px-2 text-sm bg-dark rounded-full">
                        <span class="material-symbols-outlined text-sm">
                            open_in_new
                        </span>
                        Demo</a>
                    <a :href="info.url.detail"
                    v-if="Object.prototype.hasOwnProperty.call(info.url, 'detail')" target="_blank"
                    class="flex gap-1 items-center py-1 px-2 text-sm bg-dark rounded-full">
                        <span class="material-symbols-outlined text-sm">
                            open_in_new
                        </span>
                        Detail</a>
                </div>
                <p v-if="info.intro[lang]"
                class="p-2 bg-light text-black border border-dark text-sm lg:text-base
                max-w-[80vw]">
                    {{ info.intro[lang] }}
                </p>
                <div class="hidden md:flex gap-2 items-start flex-wrap">
                    <div v-for="tag of info.tags" :key="tag"
                    class="py-1 px-2 lg:py-2 text-lavendar bg-snow-shadow text-sm rounded-full">
                        {{ tag }}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>