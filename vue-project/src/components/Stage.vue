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
    "base": '/LucienHsieh/',
    "code": ['icon_code_1.png', 'icon_code_2.png', 'icon_code_3.png', 'icon_code_4.png', 'icon_code_5.png', 'icon_code_6.png'],
    "design": ['icon_design_1.png', 'icon_design_2.png', 'icon_design_3.png']
}
let sprites = [],textureSrc, texturesPromise, tween
let texturesCaches = {
    "code": undefined,
    "design": undefined
}

watch(storeIcon, (newValue, oldValue)=>{
    // console.log("New value: "+newValue)
    clearAll()
    if (!texturesCaches[newValue.icon]){
        console.log("Load new textures: "+newValue.icon)
        for (let i=0; i<texturesPath[newValue.icon].length; i++){
            textureSrc = new URL(texturesPath.base + texturesPath[newValue.icon][i], import.meta.url).href
            // console.log(textureSrc)
            PIXI.Assets.add({
                alias: texturesPath[newValue.icon][i],
                src: textureSrc
            })
        }
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
    sprites.push(sprite)
    container.addChild(sprite)
}

function animateSprites(){
    // console.log(sprites)
    tween = gsap.fromTo(sprites, {
        pixi: {
            alpha: 0.3
        }
    },
    {
        pixi: { 
            y: window.innerHeight,
            rotation: Math.random()*60+60,
            alpha: 0
        },
        stagger: .5,
        repeat: -1,
        duration: 5,
        ease: "power3.in",
        onComplete: function(){
            clearAll()
        }
    })
}

function clearAll(){
    container.removeChildren()
    sprites.forEach(sprite => {
        sprite.destroy()
    })
    if (tween){
        tween.kill()
    }
    sprites = []
}

// Canvas
const canvas = ref(null)
onMounted(()=>{
    const parent = canvas.value.parentNode
    const [canvasWidth, canvasHeight] = [parent.getBoundingClientRect().width, parent.getBoundingClientRect().height]
    app.renderer.resize(canvasWidth, canvasHeight)

    // initialize
    storeIcon.switchIcon('code')
    
    canvas.value.appendChild(app.view)
})
</script>

<template>
    <section ref="canvas"></section>
</template>