<script setup>
import { ref, onMounted } from 'vue';
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import projects from '@/assets/projects.json'
import * as PIXI from "pixi.js";

const mouseHoverPj = ref(false)

// onMounted(()=>{
//   const app = new PIXI.Application({
//     backgroundAlpha: 0,
//     width: window.innerWidth,
//     height: window.innerHeight,
//     redizeTo: window
//   })
//   document.querySelector("#noiseOverlay").appendChild(app.view)
//   let noiseFilter = new PIXI.NoiseFilter(0.5)
  
//   const graphic = new PIXI.Graphics();
//   graphic.beginFill('0xfafafa');
//   graphic.alpha = 0.15;
//   graphic.drawRect(0, 0, app.view.width, app.view.height);
//   graphic.endFill();
//   graphic.filters = [noiseFilter]

//   app.stage.addChild(graphic);

//   setInterval(() => {
//     noiseFilter.seed = Math.random();
//   }, 50); 
// })
</script>

<template>
  <main>
    <section class="flex gap-40">
      <Project v-for="pj of projects"
      :key="pj.title"
      :title="pj.title"
      :info="{
        'name': pj.name,
        'intro': pj.intro,
        'tags': pj.tags
      }"
      @hover="mouseHoverPj = true"
      @leave="mouseHoverPj = false"/>
    </section>
  </main>
  <Mouse :hover-pj="mouseHoverPj"/>
  <!-- <section id="noiseOverlay" class="fixed top-0 left-0 mix-blend-multiply pointer-events-none"></section> -->
</template>