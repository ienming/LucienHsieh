<script setup>
import { onMounted, ref, inject } from "vue";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

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
container.y = app.screen.height / 2;
container.onmousemove = (evt) => {
    const [mouseX, mouseY] = [evt.screenX, evt.screenY]
    const [spriteOriX, spriteOriY] = [sprite.x+canvasWidth/2, sprite.y+canvasHeight/2]
    const attractionRadius = 200
    const dist = Math.sqrt(Math.pow(mouseX - spriteOriX, 2) + Math.pow(mouseY - spriteOriY, 2))
    if (dist < attractionRadius){
        let [skew_x, skew_y] = [.1, .1]
        if (mouseX > spriteOriX){
            skew_x = -0.1
        }
        if (mouseY < spriteOriY){
            skew_y = -0.1
        }
        gsap.to(maskGraphic, {
            skewX: skew_x,
            skewY: skew_y,
            duration: 1,
            onUpdate: () => {
                maskGraphic.skew.x = gsap.getProperty(maskGraphic, 'skewX');
                maskGraphic.skew.y = gsap.getProperty(maskGraphic, 'skewY');
            }
        });
        gsap.to(shadow, {
            skewX: skew_x,
            skewY: skew_y,
            duration: 1,
            onUpdate: () => {
                shadow.skew.x = gsap.getProperty(shadow, 'skewX');
                shadow.skew.y = gsap.getProperty(shadow, 'skewY');
            }
        });
    }else{
        gsap.to(maskGraphic, {
            skewX: 0,
            skewY: 0,
            duration: 1,
            onUpdate: () => {
                maskGraphic.skew.x = gsap.getProperty(maskGraphic, 'skewX');
                maskGraphic.skew.y = gsap.getProperty(maskGraphic, 'skewY');
            }
        });
        gsap.to(shadow, {
            skewX: 0,
            skewY: 0,
            duration: 1,
            onUpdate: () => {
                shadow.skew.x = gsap.getProperty(shadow, 'skewX');
                shadow.skew.y = gsap.getProperty(shadow, 'skewY');
            }
        });
    }
}
app.stage.addChild(container);

// Mask
const maskGraphic = new PIXI.Graphics();
app.stage.addChild(maskGraphic);
maskGraphic.x = app.screen.width / 2;
maskGraphic.y = app.screen.height / 2;
maskGraphic.lineStyle(0);
let randomDis = Math.floor(Math.random()*50)
let count = 0
maskGraphic.beginFill(0x8bc5ff, 0.4);
drawShape(maskGraphic)

function drawShape(el, offsetX=0, offsetY=0){
    const p1 = {
        x: -200+randomDis,
        y: -100+randomDis
    }
    const p2 = {
        x: 0+randomDis,
        y: -200+randomDis
    }
    const p3 = {
        x: 200+randomDis,
        y: -140+randomDis
    }
    const p4 = {
        x: 160+randomDis,
        y: 150+randomDis
    }
    const p5 = {
        x: -180+randomDis,
        y: 120+randomDis
    }
    el.moveTo(p1.x + offsetX , p1.y + offsetY);
    el.lineTo(p2.x + offsetX, p2.y + offsetY );
    el.lineTo(p3.x + offsetX , p3.y + offsetY);
    el.lineTo(p4.x + offsetX, p4.y + offsetY );
    el.lineTo(p5.x + offsetX, p5.y + offsetY );
}

// Noise shadow
let noiseFilter = new PIXI.NoiseFilter(0.9)
let blurFilter = new PIXI.BlurFilter(32, 6)
const shadow = new PIXI.Graphics();
let [offsetX, offsetY] = [-25, 40]
shadow.beginFill('0x244d69');
shadow.alpha = 0.3;
drawShape(shadow, offsetX, offsetY)
shadow.endFill();
shadow.filters = [blurFilter, noiseFilter]
container.addChild(shadow);

setInterval(() => {
    noiseFilter.seed = Math.random();
  }, 50); 

// Project cover
const sprite = PIXI.Sprite.from(coverImg)
// sprite.scale.set(canvasWidth / sprite.width)
sprite.scale.set(0.4)
sprite.anchor.set(0.5);
sprite.mask = maskGraphic;
sprite.eventMode = 'static'
sprite
    .on('click', ()=>{window.alert(`Go to behance view ${props.title}`)})
    .on('pointerover', () => {
        emits('hover')
    })
    .on('pointerout', () => {
        emits('leave')
    })
container.addChild(sprite);

const canvas = ref(null)
onMounted(()=>{
    canvas.value.appendChild(app.view)
})
</script>

<template>
    <section class="relative">
        <div ref="canvas"></div>
        <div class="absolute bottom-24 flex flex-col gap-3">
            <h2 class="text-3xl font-serif bg-light p-2 px-3 border border-dark font-bold">
                {{ info.name }}
            </h2>
            <div class="flex gap-2">
                <div v-for="tag of info.tags" :key="tag"
                class="p-2 border border-dark bg-light rounded-full">
                    {{ tag }}
                </div>
            </div>
            <p class="text-black">{{ info.intro[lang] }}</p>
        </div>
    </section>
</template>