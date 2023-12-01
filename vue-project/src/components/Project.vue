<script setup>
import { onMounted, ref, inject, onBeforeUnmount } from "vue";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI)

const lang = inject("lang")

const props = defineProps(['title', 'info'])
const emits = defineEmits(['hover', 'leave'])
const coverImg = new URL(`../assets/cover_${props.title}.png`, import.meta.url).href

const [canvasWidth, canvasHeight] = [600, 600]

const app = new PIXI.Application({
    backgroundAlpha: 0,
    antialias: true,
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
        gsap.to(shadow, {
            pixi: {
                skewX: skew_x,
                skewY: skew_y,
            },
            duration: 1
        });
    }else{
        gsap.to(maskGraphic, {
            pixi: {
                skewX: 0,
                skewY: 0
            },
            duration: 1
        });
        gsap.to(shadow, {
            pixi: {
                skewX: 0,
                skewY: 0
            },
            duration: 1
        });
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
    const size = 200
    el.drawEllipse(offsetX, offsetY, size, size)
    el.endFill()
}

// Noise shadow
let noiseFilter = new PIXI.NoiseFilter(0.9)
let blurFilter = new PIXI.BlurFilter(32, 6)
const shadow = new PIXI.Graphics();
let [offsetX, offsetY] = [25, 40]
shadow.beginFill('0x244d69');
shadow.alpha = 0.3;
drawShape(shadow, offsetX, offsetY)
shadow.filters = [blurFilter, noiseFilter]
container.addChild(shadow);

setInterval(() => {
    noiseFilter.seed = Math.random();
  }, 50); 

// Project cover
let sprite
const texturePromise = PIXI.Assets.load(coverImg)
texturePromise.then((resolvedTexture) => {
    sprite = PIXI.Sprite.from(resolvedTexture)
    sprite.anchor.set(0.5);
    sprite.scale.set(canvasWidth / (sprite.width - 200))
    sprite.mask = maskGraphic;
    sprite.eventMode = 'static'
    sprite
        .on('pointerdown', ()=>{window.alert(`Go to behance view ${props.title}`)})
        .on('pointerover', () => {
            emits('hover')
        })
        .on('pointerout', () => {
            emits('leave')
        })
    container.addChild(sprite);
})

const canvas = ref(null)
onMounted(()=>{
    canvas.value.appendChild(app.view)
})

onBeforeUnmount(()=>{
    app.destroy(true)
})
</script>

<template>
    <section class="relative">
        <div ref="canvas"></div>
        <div class="absolute left-1/2 w-full bottom-20 txt-slot-hover" style="--slot-offset: -165%; transform: translateX(-50%)">
            <div class="flex flex-col items-center gap-3">
                <h2 class="text-3xl p-4 txt-slot-container bg-light border border-dark">
                    <div v-for="n of 2" class="txt-slot flex gap-3 items-center">
                        <span class="font-serif font-bold">{{ info.name.zh }}</span>
                        <span class="font-light">{{ info.name.en }}</span>
                    </div>
                </h2>
                <div class="flex gap-2">
                    <div v-for="tag of info.tags" :key="tag"
                    class="p-2 border border-lavendar text-lavendar bg-light rounded-full">
                        {{ tag }}
                    </div>
                </div>
                <p class="text-black mt-3">{{ info.intro[lang] }}</p>
            </div>
        </div>
    </section>
</template>