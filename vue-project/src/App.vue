<script setup>
import { ref, provide, onMounted, nextTick } from 'vue';
import TopHeader from '@/components/TopHeader.vue'
import Avatar from '@/components/Avatar.vue'
import CoverLetter from '@/components/CoverLetter.vue'
import Contact from '@/components/Contact.vue'
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import Enter from './components/Enter.vue';
import Controller from '@/components/Controller.vue'
import projects from '@/assets/projects.json'
import { gsap } from 'gsap';
import { storeCV } from './store';

const lang = ref("zh")
provide("lang", lang)

const usingMobile = ref(false)
const mobileStrings = ['iPhone', 'Android']
mobileStrings.forEach(str => {
  if (navigator.userAgent.indexOf(str) > -1) {
    usingMobile.value = true
    return
  }
})
provide('usingMobile', usingMobile)

const currentTab = ref("all")
provide("currentTab", currentTab)
function switchTab(tab) {
  currentTab.value = tab
  if (deltaX !== 0) {
    back2Start()
  }
}

const mouseHoverPj = ref(false)

// Scroll projects
const projectContainer = ref(null)
let deltaX = 0

function back2Start() {
  const dom = projectContainer.value
  gsap.to(dom, {
    scrollLeft: 0,
    duration: 1,
    ease: 'power3.out'
  })
  deltaX = 0
}

function wheelShowCase(evt) {
  const dom = projectContainer.value
  const scrollWidth = dom.scrollWidth

  let deltaDist;

  if (evt.type === 'wheel') {
    deltaDist = evt.deltaY || evt.deltaX;
  } else if (evt.type === 'scroll') {
    deltaDist = evt.deltaY;
  } else {
    return;
  }

  gsap.to(dom, {
    scrollLeft: () => {
      if (deltaDist > 0){
        if (deltaX + deltaDist <= scrollWidth){
          return deltaX += deltaDist
        }else{
          return deltaX = scrollWidth
        }
      }else{
        if (deltaX + deltaDist >= 0){
          return deltaX += deltaDist
        }else{
          return 0
        }
      }
    },
    duration: 0.3,
    ease: 'power3.out',
  });
}

function stepShowCase(type) {
  const dom = projectContainer.value
  const scrollWidth = dom.scrollWidth
  const step = usingMobile.value ? window.innerWidth : 500
  switch (type) {
    case "forward":
      gsap.to(dom, {
        scrollLeft: () => {
          console.log(deltaX)
          if (deltaX + step <= scrollWidth){
            return deltaX += step
          }else{
            return deltaX = scrollWidth
          }
        },
        duration: 1,
        ease: "power3.out"
      })
      break;
    case "backward":
      gsap.to(dom, {
        scrollLeft: () => {
          console.log(deltaX)
          if (deltaX - step >= 0){
            return deltaX -= step
          }else{
            return 0
          }
        },
        duration: 1,
        ease: "power3.out"
      })
  }
}

// Enter Animation
const enterAnimating = ref(true)
function revealProjects(){
  const dom = projectContainer.value
  gsap.fromTo(dom, {
    scrollLeft: 800,
  }, {
    scrollLeft: 0,
    duration: 1.5,
    ease: "power3.inOut"
  })
}
function closeEnterAnim(){
  enterAnimating.value = false
}

// const mainFrame = ref(null)
onMounted(() => {
  nextTick(() => {
    const pjBox = document.querySelector("#projectContainer")
    // const mainEl = document.querySelector("#mainFrame")
    // const mainEl = mainFrame.value
    // const topEl = document.querySelector("#topHeader")
    const padding = usingMobile.value ? 24 : 40
    const topHeight = usingMobile.value ? 48 : document.querySelector("#topHeader").clientHeight
    const h = (window.innerHeight - padding) - topHeight
    // window.alert('main: '+(window.innerHeight - padding)+'; top: '+topEl.clientHeight+'; '+'Total: '+h)
    pjBox.style.height = h + 'px'
  })
})
</script>

<template>
  <main class="relative text-dark border-4 lg:border-8 border-dark h-full" :class="enterAnimating ? '':'cursor-none'"
  id="mainFrame" ref="mainFrame">
    <Avatar v-show="!storeCV.show" @click="storeCV.toggleCV()" class="toucher absolute left-1 top-16 lg:top-20 z-10" />
    <TopHeader @switch-tab="switchTab" />
    <div id="projectContainer" class="relative" :class="!storeCV.show ? 'overflow-y-hidden' : ''"
    @wheel="wheelShowCase" ref="projectContainer">
      <section class="absolute top-1/2 left-0" v-show="!storeCV.show"
        style="transform: translateY(-50%);">
        <div class="flex items-center gap-5 lg:gap-20 ps-10 lg:ps-40">
          <TransitionGroup name="list">
            <Project
              v-for="pj of projects"
              v-show="pj.cate.includes(currentTab) || currentTab === 'all'"
              :key="pj.title"
              :title="pj.title"
              :info="{
                'name': pj.name,
                'cate': pj.cate,
                'intro': pj.intro,
                'tags': pj.tags,
                'url': pj.url
            }" @hover="mouseHoverPj = true" @leave="mouseHoverPj = false" />
          </TransitionGroup>
          <div class="text-sm text-lavendar flex flex-col gap-3 lg:gap-5 whitespace-nowrap">
            <span>The End</span>
            <button class="toucher flex items-center gap-1 txt-slot-hover" @click="back2Start">
              <span class="material-symbols-outlined p-1 border border-lavendar rounded-full
            ">arrow_back</span>
              <div class="txt-slot-container">
                <span v-for="n of 2" class="txt-slot">Back to the start</span>
              </div>
            </button>
          </div>
        </div>
      </section>
      <Transition name="list" mode="out-in">
        <CoverLetter v-show="storeCV.show" :show="storeCV.show" class="absolute top-0 left-0" @close="storeCV.toggleCV()" />
      </Transition>
    </div>
    <Controller @show-prev="stepShowCase('backward')" @show-next="stepShowCase('forward')"
      class="absolute bottom-0 right-0 p-3" />
      <Transition name="list">
        <Contact v-if="!enterAnimating" class="absolute -bottom-4 -left-4 z-20 hidden lg:block" />
      </Transition>
    <div id="bgTitle" class="absolute bottom-0 w-full h-1/5 lg:h-2/6 lg:opacity-30"></div>
    <Enter v-if="enterAnimating"
    class="absolute top-0 left-0" @finish="closeEnterAnim" @start="revealProjects"></Enter>
  </main>
  <Mouse v-if="!enterAnimating" :hover-pj="mouseHoverPj"></Mouse>
</template>

<style scoped>
#bgTitle {
  background-image: url("./assets/bg.png");
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(90deg) translateX(-50%);
  z-index: -1;
}

@media screen and (min-width: 992px) {
  #bgTitle {
    transform: none;
  }
}

#projectContainer::-webkit-scrollbar{
  display: none;
}

#projectContainer{
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>