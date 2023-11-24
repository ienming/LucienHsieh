<script setup>
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

const lang = "zh"

const props = defineProps(['title', 'info'])
const emits = defineEmits(['hover', 'leave'])
const coverImg = new URL(`../assets/cover_${props.title}.png`, import.meta.url).href

const [canvasWidth, canvasHeight] = [500, 600]

const app = new PIXI.Application({
    backgroundAlpha: 0,
    antialias: true,
    width: canvasWidth,
    height: canvasHeight
});

const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
app.stage.addChild(container);

// Mask
const maskGraphic = new PIXI.Graphics();
app.stage.addChild(maskGraphic);
maskGraphic.x = app.screen.width / 2;
maskGraphic.y = app.screen.height / 2;
maskGraphic.lineStyle(0);
let randomDis = Math.floor(Math.random()*20)
let count = 0
maskGraphic.beginFill(0x8bc5ff, 0.4);
drawShape(maskGraphic)

function drawShape(el, offsetX=0, offsetY=0){
    el.moveTo(-1*180 + offsetX + Math.sin(count) * randomDis, -1*180 + offsetY + Math.cos(count) * randomDis);
    el.lineTo(180 + offsetX + Math.cos(count) * randomDis, -1*180 + offsetY + Math.sin(count) * randomDis);
    el.lineTo(180 + offsetX + Math.sin(count) * randomDis, 180 + offsetY + Math.cos(count) * randomDis);
    el.lineTo(-1*180 + offsetX + Math.cos(count) * randomDis, 180 + offsetY + Math.sin(count) * randomDis);
}

// Noise shadow
let noiseFilter = new PIXI.NoiseFilter(0.9)
let blurFilter = new PIXI.BlurFilter(32, 6)
const shadow = new PIXI.Graphics();
let [offsetX, offsetY] = [40, 35]
shadow.beginFill('0x000000');
shadow.alpha = 0.2;
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

// app.ticker.add(()=>{
//     maskGraphic.clear()
//     shadow.clear()

//     count += 0.01;

//     drawShape(maskGraphic)
//     drawShape(shadow, offsetY, offsetY)
// })

const canvas = ref(null)
onMounted(()=>{
    canvas.value.appendChild(app.view)
})
</script>

<template>
    <section class="relative">
        <div ref="canvas"></div>
        <div class="absolute bottom-5 flex flex-col gap-3">
            <h2 class="text-3xl font-serif bg-light p-2 px-3 border border-cyan-800 font-bold">
                {{ info.name }}
            </h2>
            <div class="flex gap-2">
                <div v-for="tag of info.tags" :key="tag"
                class="p-2 border border-cyan-800 bg-light rounded-full">
                    {{ tag }}
                </div>
            </div>
            <p class="text-black">{{ info.intro[lang] }}</p>
        </div>
    </section>
</template>