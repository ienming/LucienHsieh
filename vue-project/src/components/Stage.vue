<script setup>
import { ref, onMounted, watch } from 'vue';
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI)
import { storeIcon } from '../store.js';

const app = new PIXI.Application({
    backgroundAlpha: 0
})
const container = new PIXI.Container();
app.stage.addChild(container)

// Sprite
const texturesPath =  {
    "base": '../assets/',
    "code": ['icon_code_1.png', 'icon_code_2.png'],
    "design": ['icon_design_1.png', 'icon_design_2.png']
}
let sprites = [], texturesPromise
let texturesCaches = {
    "code": undefined,
    "design": undefined
}

for (let i=0; i<texturesPath[storeIcon.icon].length; i++){
    const src = new URL(texturesPath.base+texturesPath[storeIcon.icon][i], import.meta.url).href
    PIXI.Assets.add({
        alias: texturesPath[storeIcon.icon][i],
        src: src
    })
}

watch(storeIcon, (newValue, oldValue)=>{
    console.log(newValue, oldValue)
    if (!texturesCaches[newValue.icon]){
        console.log("Load new textures: "+newValue.icon)
        texturesPromise = PIXI.Assets.load(texturesPath[newValue.icon])
        texturesPromise.then((textures) => {
            texturesCaches[newValue.icon] = textures
            for (let i=0; i<10; i++){
                makeSprite(textures)
            }
            animateSprites()
        })
    }else{
        console.log("Already have textures: "+newValue.icon)
        for (let i=0; i<10; i++){
            makeSprite(texturesCaches[newValue.icon])
        }
        animateSprites()
    }
})

function makeSprite(textures){
    const random = Math.floor(Math.random() * texturesPath[storeIcon.icon].length)
    const sprite = PIXI.Sprite.from(textures[texturesPath[storeIcon.icon][random]])
    sprite.x = Math.floor(Math.random()*app.renderer.width)
    sprite.anchor.set(0.5);
    sprite.scale.set(0.5);
    sprites.push(sprite)
    container.addChild(sprite)
}

function animateSprites(){
    gsap.to(sprites, {
        pixi: { 
            y: window.innerHeight,
            alpha: 0,
            scale: 1,
            rotation: Math.random()*60+60
        },
        stagger: .1,
        duration: 1,
        ease: "power3.in",
        onComplete: function(){
            container.removeChildren()
            console.log(container)
        }
    })
}

// Canvas
const canvas = ref(null)
onMounted(()=>{
    const parent = canvas.value.parentNode
    const [canvasWidth, canvasHeight] = [parent.getBoundingClientRect().width, parent.getBoundingClientRect().height]
    app.renderer.resize(canvasWidth, canvasHeight)
    
    canvas.value.appendChild(app.view)
})
</script>

<template>
    <section ref="canvas"></section>
</template>