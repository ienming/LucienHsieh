<script setup>
import { ref, provide, computed } from 'vue';
import TopHeader from '@/components/TopHeader.vue'
import Avatar from '@/components/Avatar.vue'
import CoverLetter from '@/components/CoverLetter.vue'
import Contact from '@/components/Contact.vue'
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import Controller from '@/components/Controller.vue'
import projects from '@/assets/projects.json'
import { gsap } from 'gsap';
import * as PIXI from "pixi.js";

const lang = ref("zh")
provide("lang", lang)

const currentTab = ref("all")
function switchTab(tab){
  currentTab.value = tab
  // if (deltaX !== 0){
  //   const dom = showCase.value;
  //   gsap.to(dom, {
  //     x: 0,
  //     duration: 1,
  //     ease: 'power3.out'
  //   })
  // }
}

const projectsFiltered = computed(()=>{
  if (projects){
    if (currentTab.value === 'all'){
      return projects
    }else{
      return projects.filter(pj => pj.cate.includes(currentTab.value))
    }
  }
})

const coverLetterShowing = ref(false)

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
  <main class="relative text-dark border-8 border-dark h-full">
    <TopHeader class="absolute top-0" :current-tab="currentTab"
    @switch-tab="switchTab"/>
    <Avatar @click="coverLetterShowing = true" class="absolute top-20 left-10 z-10"/>
    <h6 class="absolute bottom-0 left-1/2 font-display tracking-wide -translate-x-1/2 pointer-events-none -z-2 text-dark opacity-5"
    style="font-size: 200px;">
      <p>Project</p>
      <p>Project</p>
      <p>Project</p>
    </h6>
    <section class="fixed top-1/2 left-0 w-screen"
    v-show="projectsFiltered"
    style="transform: translateY(-50%)" @wheel="wheelShowCase"
    >
    <div class="flex gap-20 ps-40" ref="showCase">
      <transition-group name="fade">
        <Project v-for="pj of projectsFiltered"
        :key="pj.title"
        :title="pj.title"
        :info="{
          'name': pj.name,
          'intro': pj.intro,
          'tags': pj.tags
        }"
        @hover="mouseHoverPj = true"
        @leave="mouseHoverPj = false"/>
      </transition-group>
    </div>
    </section>
    <Controller @show-prev="scrollShowCase('backward')" @show-next="scrollShowCase('forward')"/>
    <Contact class="absolute bottom-0 right-0"/>
  </main>
  <Mouse :hover-pj="mouseHoverPj"/>
  <CoverLetter v-if="coverLetterShowing" class="fixed top-0 right-0" @close="coverLetterShowing = false"/>
</template>