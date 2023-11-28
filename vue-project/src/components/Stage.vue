<script setup>
import { ref, onMounted } from 'vue';
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import logoImg from '../assets/logo.svg'
gsap.registerPlugin(PixiPlugin);

const app = new PIXI.Application({
    backgroundAlpha: 0
})
const container = new PIXI.Container();
app.stage.addChild(container)

// Sprite
let sprites = [], texturePromise

texturePromise = PIXI.Assets.load(logoImg)
texturePromise.then((resolvedTexture) => {
    for (let i=0; i<10; i++){
        const sprite = PIXI.Sprite.from(resolvedTexture)
        sprite.x = Math.floor(Math.random()*app.renderer.width)
        sprite.anchor.set(0.5);
        sprites.push(sprite)
        container.addChild(sprite);
    }
    gsap.to(sprites, {
        y: window.innerHeight,
        alpha: 0,
        stagger: .1,
        duration: 1,
        ease: "power3.in",
        onUpdate: function(){
            this.y = gsap.getProperty(this, 'y');
            this.alpha = gsap.getProperty(this, 'alpha');
        }
    })
})

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
    <!-- <button @click="showIcons">Click</button> -->
</template>