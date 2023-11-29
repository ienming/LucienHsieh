<script setup>
import { onMounted, ref, inject } from "vue";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI)

const lang = inject("lang")

const props = defineProps(['title', 'info'])
const emits = defineEmits(['hover', 'leave'])
const coverImg = new URL(`../assets/cover_${props.title}.png`, import.meta.url).href

const [canvasWidth, canvasHeight] = [600, 800]

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
        let [skew_x, skew_y] = [3, 3]
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
app.stage.addChild(maskGraphic);
maskGraphic.x = app.screen.width / 2;
maskGraphic.y = app.screen.height / 2;
maskGraphic.lineStyle(0);
// let randomDis = Math.floor(Math.random()*50)
let randomDis = 0
let count = 0
maskGraphic.beginFill(0x8bc5ff, 0.4);
drawShape(maskGraphic)

function drawShape(el, offsetX=0, offsetY=0){
    const points = [
        {
            x: -200+randomDis,
            y: -150+randomDis
        },
        {
            x: 200+randomDis,
            y: -180+randomDis
        },
        {
            x: 200+randomDis,
            y: 120+randomDis
        },
        {
            x: -200+randomDis,
            y: 150+randomDis
        }
    ]
    for(let i=0; i<points.length; i++){
        if (i==0){
            el.moveTo(points[i].x + offsetX , points[i].y + offsetY);
        }else{
            el.lineTo(points[i].x + offsetX , points[i].y + offsetY);
        }
    }
}

// Noise shadow
let noiseFilter = new PIXI.NoiseFilter(0.9)
let blurFilter = new PIXI.BlurFilter(32, 6)
const shadow = new PIXI.Graphics();
let [offsetX, offsetY] = [25, 40]
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
</script>

<template>
    <section class="relative">
        <div ref="canvas"></div>
        <div class="absolute bottom-52 flex flex-col items-baseline gap-2 txt-slot-hover" style="--slot-offset: -165%;">
            <h2 class="text-3xl p-5 txt-slot-container">
                <div v-for="n of 2" class="txt-slot flex gap-3 items-center">
                    <span class="font-serif font-bold">{{ info.name.zh }}</span>
                    <span class="font-light">{{ info.name.en }}</span>
                </div>
            </h2>
            <div class="flex gap-2">
                <div v-for="tag of info.tags" :key="tag"
                class="p-2 border border-dark bg-light rounded-full">
                    {{ tag }}
                </div>
            </div>
            <p class="text-black mt-3">{{ info.intro[lang] }}</p>
        </div>
    </section>
</template>

<style scoped>
h2 {
    background-image: url("../assets/bg_pj_title.png");
    background-size: 100% 90%;
    background-repeat: no-repeat;
}
</style>