<script setup>
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);

const props = defineProps(['title', 'info'])
const emits = defineEmits(['hover', 'leave'])
const coverImg = new URL(`../assets/cover_${props.title}.png`, import.meta.url).href

const [canvasWidth, canvasHeight] = [800, 600]

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
let randomDis = Math.floor(Math.random()*50)
maskGraphic.beginFill(0x8bc5ff, 0.4);
maskGraphic.moveTo(-1*180 + Math.sin(0) * randomDis, -1*180 + Math.cos(0) * randomDis);
maskGraphic.lineTo(180 + Math.cos(0) * randomDis, -1*180 + Math.sin(0) * randomDis);
maskGraphic.lineTo(180 + Math.sin(0) * randomDis, 180 + Math.cos(0) * randomDis);
maskGraphic.lineTo(-1*180 + Math.cos(0) * randomDis, 180 + Math.sin(0) * randomDis);

// Noise shadow
let noiseFilter = new PIXI.NoiseFilter(0.9)
let blurFilter = new PIXI.BlurFilter(32, 6)
const shadow = new PIXI.Graphics();
shadow.x = -90;
shadow.y = -90;
shadow.beginFill('0x000000');
shadow.alpha = 0.5;
shadow.drawRect(0, 0, 800, 600);
shadow.endFill();
shadow.mask = maskGraphic;
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
    .on('click', ()=>{window.alert("Go to behance")})
    .on('pointerover', () => emits('hover'))
    .on('pointerout', () => emits('leave'))
container.addChild(sprite);

const canvas = ref(null)
onMounted(()=>{
    canvas.value.appendChild(app.view)
})
</script>

<template>
    <section class="relative">
        <div ref="canvas"></div>
        <div class="absolute -bottom-4">
            {{ info.name }}
        </div>
    </section>
</template>