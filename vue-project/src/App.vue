<script setup>
import { ref, provide, computed, onMounted } from 'vue';
import TopHeader from '@/components/TopHeader.vue'
import Avatar from '@/components/Avatar.vue'
import Stage from './components/Stage.vue';
import CoverLetter from '@/components/CoverLetter.vue'
import Contact from '@/components/Contact.vue'
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import Controller from '@/components/Controller.vue'
import projects from '@/assets/projects.json'
import { gsap } from 'gsap';
import { storeCV } from './store';

const lang = ref("zh")
provide("lang", lang)

const currentTab = ref("all")
function switchTab(tab){
  currentTab.value = tab
  if (deltaX !== 0){
    const dom = showCase.value;
    gsap.to(dom, {
      x: 0,
      duration: 1,
      ease: 'power3.out'
    })
    deltaX = 0
  }
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

const mouseHoverPj = ref(false)

const showCase = ref(null)
let deltaX = 0
function wheelShowCase(evt){
  const dom = showCase.value;
  const domWidth = dom.getBoundingClientRect().width
  gsap.to(dom, {
    x: ()=>{
      if (evt.deltaY > 0 && deltaX*-1 < domWidth){
        // return deltaX += -1*evt.deltaY
        if (deltaX-evt.deltaY < domWidth*-1){
          return deltaX -= (domWidth-(deltaX*-1)-200)
        }else return deltaX -= evt.deltaY
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
  const step = 500
  switch (type) {
    case "forward":
      gsap.to(dom, {
        x: ()=>{
          if (deltaX*-1 < domWidth){
            if (deltaX-step < domWidth*-1){
              return deltaX -= (domWidth-(deltaX*-1)-170)
            }else return deltaX -= step
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

onMounted(()=>{
  const dom = showCase.value;
  gsap.fromTo(dom, {
    x: -1000
  }, {
    x: 0,
    duration: 1.5,
    ease: "power3.inOut"
  })
})
</script>

<template>
  <main class="relative text-dark border-4 lg:border-8 border-dark h-full"
  id="mainFrame">
    <Avatar @click="storeCV.toggleCV()" class="toucher absolute top-32 left-5 lg:top-20 lg:left-10 z-10"/>
    <TopHeader :current-tab="currentTab" @switch-tab="switchTab"/>
    <Stage v-if="!storeCV.show" class="absolute top-0 left-0"/>
    <div class="relative">
      <section class="fixed top-1/2 left-0"
      v-if="projectsFiltered && !storeCV.show"
      style="transform: translateY(-50%)" @wheel="wheelShowCase"
      >
      <div class="flex gap-20 ps-10 lg:ps-40" ref="showCase">
        <transition-group name="fade">
          <Project v-for="pj of projectsFiltered"
          :key="pj.title"
          :title="pj.title"
          :info="{
            'name': pj.name,
            'intro': pj.intro,
            'tags': pj.tags,
            'url': pj.url
          }"
          @hover="mouseHoverPj = true"
          @leave="mouseHoverPj = false"/>
        </transition-group>
      </div>
      </section>
      <CoverLetter v-show="storeCV.show" :show="storeCV.show"
      class="absolute top-0 left-0" @close="storeCV.toggleCV()"/>
    </div>
    <Controller @show-prev="scrollShowCase('backward')" @show-next="scrollShowCase('forward')"/>
    <Contact class="toucher absolute -bottom-4 -right-4 z-20"/>
  </main>
  <Mouse :hover-pj="mouseHoverPj"/>
</template>

<style scoped>
main {
  background-image: url("./assets/bg.png");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 10vw 60vh;
}
</style>