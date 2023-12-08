<script setup>
import { ref, provide, computed, onMounted, nextTick } from 'vue';
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

const usingMobile = ref(false)
const mobileStrings = ['iPhone', 'Android']
mobileStrings.forEach(str => {
    if (navigator.userAgent.indexOf(str) > -1){
        usingMobile.value = true
    return
    }
})
provide('usingMobile', usingMobile)

const currentTab = ref("all")
provide("currentTab", currentTab)
function switchTab(tab){
  currentTab.value = tab
  if (deltaX !== 0){
    back2Start()
  }
}

function back2Start(){
  const dom = showCase.value;
    gsap.to(dom, {
      x: 0,
      duration: 1,
      ease: 'power3.out'
    })
    deltaX = 0
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
function wheelShowCase(evt) {
  const dom = showCase.value;
  const domWidth = dom.getBoundingClientRect().width;

  let deltaDist;

  if (evt.type === 'wheel') {
    deltaDist = evt.deltaY || evt.deltaX;
  } else if (evt.type === 'touchmove') {
    const touch = evt.touches[0];
    const touchStartX = touch.clientX;
    const touchMoveX = touch.clientX;
    deltaDist = touchMoveX - touchStartX;
  } else if (evt.type === 'scroll') {
    deltaDist = evt.deltaY;
  } else {
    return;
  }

  gsap.to(dom, {
    x: () => {
      if (deltaDist > 0 && deltaX * -1 < domWidth) {
        if (deltaX - deltaDist < domWidth * -1) {
          return deltaX -= (domWidth - (deltaX * -1) - 200);
        } else {
          return deltaX -= deltaDist;
        }
      } else if (deltaDist < 0 && deltaX < 0) {
        return deltaX += -1 * deltaDist;
      }
    },
    duration: 0.3,
    ease: 'power3.out',
  });
}
// function wheelShowCase(evt){
//   const dom = showCase.value;
//   const domWidth = dom.getBoundingClientRect().width
//   gsap.to(dom, {
//     x: ()=>{
//       let deltaDist
//       if (evt.deltaX == 0){
//         deltaDist = evt.deltaY
//       }else deltaDist = evt.deltaX
//       if (deltaDist > 0 && deltaX*-1 < domWidth){
//         if (deltaX-deltaDist < domWidth*-1){
//           return deltaX -= (domWidth-(deltaX*-1)-200)
//         }else return deltaX -= deltaDist
//       }else if (deltaDist < 0 && deltaX < 0){
//         return deltaX += -1*deltaDist
//       }
//     },
//     duration: .3,
//     ease: "power3.out"
//   })
// }

function scrollShowCase(type) {
  const dom = showCase.value;
  const domWidth = dom.getBoundingClientRect().width
  const step = usingMobile.value ? window.innerWidth : 500
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

// const mainFrame = ref(null)
onMounted(()=>{
  nextTick(()=>{
    const pjBox = document.querySelector("#projectContainer")
    // const mainEl = document.querySelector("#mainFrame")
    // const mainEl = mainFrame.value
    const topEl = document.querySelector("#topHeader")
    const padding = usingMobile.value ? 24 : 40
    const h = (window.innerHeight - padding) - topEl.clientHeight
    // window.alert('main: '+(window.innerHeight - padding)+'; top: '+topEl.clientHeight+'; '+'Total: '+h)
    pjBox.style.height = h+'px'
  })

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
  id="mainFrame" ref="mainFrame">
    <Avatar @click="storeCV.toggleCV()" class="toucher absolute left-1 top-16 lg:top-20 z-10"/>
    <TopHeader @switch-tab="switchTab"/>
    <Stage v-if="!storeCV.show" class="absolute top-0 left-0"/>
    <div id="projectContainer" class="relative"
    :class="!storeCV.show ? 'overflow-hidden':''">
      <section class="absolute top-1/2 left-0"
      v-if="projectsFiltered && !storeCV.show"
      style="transform: translateY(-50%);"
      @wheel="wheelShowCase"
      >
      <div class="flex items-center gap-5 lg:gap-20 ps-10 lg:ps-40" ref="showCase">
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
        <div class="text-sm text-lavendar flex flex-col gap-3 lg:gap-5 whitespace-nowrap">
          <span>The End</span>
          <button class="toucher flex items-center gap-1 txt-slot-hover"
          @click="back2Start">
            <span class="material-symbols-outlined p-1 border border-lavendar rounded-full
            ">arrow_back</span>
            <div class="txt-slot-container">
              <span v-for="n of 2" class="txt-slot">Back to the start</span>
            </div>
          </button>
        </div>
      </div>
      </section>
      <CoverLetter v-show="storeCV.show" :show="storeCV.show"
      class="absolute top-0 left-0" @close="storeCV.toggleCV()"/>
    </div>
    <Controller @show-prev="scrollShowCase('backward')" @show-next="scrollShowCase('forward')"
    class="absolute bottom-0 right-0 p-3"/>
    <Contact class="toucher absolute -bottom-4 -left-4 z-20 hidden lg:block"/>
    <div id="bgTitle" class="absolute bottom-0 w-full h-1/5 lg:h-2/6 lg:opacity-30"></div>
  </main>
  <Mouse :hover-pj="mouseHoverPj"/>
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
  #bgTitle{
    transform: none;
  }
}
</style>