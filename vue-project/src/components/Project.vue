<script setup>
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

const props = defineProps(['title', 'info'])
const emits = defineEmits(['hover', 'leave'])
const coverImg = new URL(`../assets/cover_${props.title}.png`, import.meta.url).href

const [canvasWidth, canvasHeight] = [400, 300]

const app = new PIXI.Application({
    backgroundAlpha: 0,
    antialias: true,
    width: canvasWidth,
    height: canvasHeight
});

const container = new PIXI.Container();

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

const sprite = PIXI.Sprite.from(coverImg)
// sprite.scale.set(canvasWidth / sprite.width)
sprite.scale.set(0.4)
sprite.anchor.set(0.5);

container.addChild(sprite);

app.stage.addChild(container);

// let's create a moving shape
const masking = new PIXI.Graphics();

app.stage.addChild(masking);
masking.x = app.screen.width / 2;
masking.y = app.screen.height / 2;
masking.lineStyle(0);

// container.mask = masking;
let count = 0;
let randomDis = Math.floor(Math.random()*10)
masking.beginFill(0x8bc5ff, 0.4);
masking.moveTo(-1*180 + Math.sin(count) * randomDis, -1*180 + Math.cos(count) * randomDis);
masking.lineTo(180 + Math.cos(count) * randomDis, -1*180 + Math.sin(count) * randomDis);
masking.lineTo(180 + Math.sin(count) * randomDis, 180 + Math.cos(count) * randomDis);
masking.lineTo(-1*180 + Math.cos(count) * randomDis, 180 + Math.sin(count) * randomDis);

// app.ticker.add(() =>
// {
//     count += 0.01;

//     masking.clear();

//     masking.beginFill(0x8bc5ff, 0.4);
//     masking.moveTo(-1*180 + Math.sin(count) * randomDis, -1*180 + Math.cos(count) * randomDis);
//     masking.lineTo(180 + Math.cos(count) * randomDis, -1*180 + Math.sin(count) * randomDis);
//     masking.lineTo(180 + Math.sin(count) * randomDis, 180 + Math.cos(count) * randomDis);
//     masking.lineTo(-1*180 + Math.cos(count) * randomDis, 180 + Math.sin(count) * randomDis);
// });


const canvas = ref(null)
onMounted(()=>{
    canvas.value.appendChild(app.view)
})
</script>

<template>
    <section class="relative">
        <a href="">
            <div @mouseover="emits('hover')" @mouseleave="emits('leave')" ref="canvas"></div>
        </a>
        <div class="absolute -bottom-4">
            {{ info.name }}
        </div>
    </section>
</template>