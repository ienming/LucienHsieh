<script setup>
import { ref, provide } from 'vue';
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import Controller from '@/components/Controller.vue'
import projects from '@/assets/projects.json'
import { gsap } from 'gsap';
import * as PIXI from "pixi.js";

const lang = "zh"
provide("lang", lang)
const mouseHoverPj = ref(false)

const showCase = ref(null)
let deltaX = 0
function wheelShowCase(evt){
  const dom = showCase.value;
  const domWidth = dom.getBoundingClientRect().width
  gsap.to(dom, {
    x: ()=>{
      if (evt.deltaY > 0 && deltaX*-1 < domWidth){
        return deltaX += -1*evt.deltaY
      }else if (evt.deltaY < 0 && deltaX < 0){
        return deltaX += -1*evt.deltaY
      }
    },
    duration: .3,
    ease: "power3.out"
  })
}

function scrollShowCase(type) {
  const dom = showCase.value;
  const domWidth = dom.getBoundingClientRect().width
  const step = window.innerWidth/3
  switch (type) {
    case "forward":
      gsap.to(dom, {
        x: ()=>{
          if (deltaX*-1 < domWidth){
            return deltaX -= step
          }else return deltaX
        },
        duration: 1,
        ease: "power3.out"
      })
      break;
    case "backward":
      gsap.to(dom, {
        x: ()=>{
          if (deltaX < 0){
            return deltaX += step
          }else return deltaX
        },
        duration: 1,
        ease: "power3.out"
      })
  }
}
</script>

<template>
  <main class="relative text-dark border-2 border-dark h-full">
    <TopHeader />
    <h6 class="absolute bottom-0 left-1/2 font-display text-slate-200 tracking-wide opacity-50 -translate-x-1/2"
    style="font-size: 200px;">
      <span>Project</span>
    </h6>
    <section class="fixed top-1/2 left-0 w-screen"
    style="transform: translateY(-50%)" @wheel="wheelShowCase"
    >
    <div class="flex gap-20 ps-40" ref="showCase">
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
    </div>
    </section>
    <Controller @show-prev="scrollShowCase('backward')" @show-next="scrollShowCase('forward')"/>
  </main>
  <Mouse :hover-pj="mouseHoverPj"/>
</template>