<script setup>
import { ref, provide, onMounted, nextTick, watch } from 'vue';
import { gsap } from 'gsap';
import { storeCV } from './store';
import { setLightTheme } from './methods/color';
// Components
import TopHeader from '@/components/TopHeader.vue'
import Avatar from '@/components/Avatar.vue'
import CoverLetter from '@/components/CoverLetter.vue'
import Contact from '@/components/Contact.vue'
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import Enter from '@/components/Enter.vue';
import IconSign from '@/components/icons/IconSign.vue';
// Data
import projects from '@/assets/projects.json'

const lang = ref("zh")
provide("lang", lang)

const usingMobile = ref(false)
console.log(window.innerWidth, window.innerHeight)
if (window.innerWidth < window.innerHeight){
  usingMobile.value = true
}
provide('usingMobile', usingMobile)

const currentTab = ref("all")
provide("currentTab", currentTab)
function switchTab(tab) {
  currentTab.value = tab
  back2Start()
}

const mouseHoverPj = ref(false)

// Scroll projects
const projectContainer = ref(null)

function back2Start() {
  const dom = projectContainer.value
  gsap.to(dom, {
    scrollTop: 0,
    duration: 1,
    ease: 'power3.out'
  })
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

// Init
const pjContainerHeight = ref(0)
function setPjContainerHeight(){
  if (!storeCV.show){
    const padding = usingMobile.value ? 24 : 40
    const bdWidth = usingMobile.value ? 4 : 23
    const topHeight = document.querySelector("#topHeader").clientHeight
    const h = window.innerHeight - padding - topHeight - bdWidth
    pjContainerHeight.value = h+'px'
  }else pjContainerHeight.value = '0px'
}

watch(storeCV, async (newValue, oldValue) => {
  setPjContainerHeight()
})

onMounted(()=>{
  nextTick(()=>{
    setPjContainerHeight()
    setLightTheme()
  })
})
</script>

<template>
  <main class="relative bg-light text-dark rounded-[32px] lg:rounded-[70px] overflow-hidden border-4 lg:border-8 border-dark h-full" :class="enterAnimating ? '':'cursor-none'"
  id="mainFrame">
    <Enter v-if="enterAnimating"
      class="absolute top-0 left-0" @finish="closeEnterAnim" @start="revealProjects"></Enter>
    <Avatar v-show="!storeCV.show" @click="storeCV.toggleCV()" />
    <TopHeader @switch-tab="switchTab" />
    <div id="projectContainer"
    ref="projectContainer"
    :style="{'height': pjContainerHeight}"
    class="relative overflow-y-scroll">
      <div class="pt-20 inline-flex justify-end w-full pr-10 lg:hidden">
        <IconSign></IconSign>
      </div>
      <section v-show="!storeCV.show"
      class="flex flex-col items-start gap-5 lg:gap-0 xl:pl-48 lg:pb-48">
          <TransitionGroup name="list">
            <Project
              v-for="pj of projects"
              v-show="pj.cate.includes(currentTab) || currentTab === 'all'"
              :key="pj.title"
              :title="pj.title"
              :info="{
                'mask': pj.mask,
                'name': pj.name,
                'cate': pj.cate,
                'intro': pj.intro,
                'tags': pj.tags,
                'url': pj.url
            }" @hover="mouseHoverPj = true" @leave="mouseHoverPj = false" />
          </TransitionGroup>
          <div class="text-sm flex flex-col gap-3 lg:gap-5 whitespace-nowrap
          pl-6 pb-20 lg:pb-0">
            <span>The End</span>
            <button class="toucher flex items-center gap-1 txt-slot-hover" @click="back2Start">
              <span class="material-symbols-outlined p-1 border rounded-full
            ">arrow_top</span>
              <div class="txt-slot-container">
                <span v-for="n of 2" class="txt-slot">Back to the start</span>
              </div>
            </button>
          </div>
      </section>
    </div>
    <Transition name="fade" mode="out-in">
      <CoverLetter v-show="storeCV.show" :show="storeCV.show" @close="storeCV.toggleCV()" />
    </Transition>
    <IconSign class="hidden lg:block absolute bottom-8 left-10"></IconSign>
  </main>
  <Transition name="fade">
    <Contact v-if="!enterAnimating" class="absolute bottom-4 right-4 z-20 hidden lg:block" />
  </Transition>
  <Mouse v-if="!enterAnimating" :hover-pj="mouseHoverPj"></Mouse>
</template>

<style scoped>
#mainFrame{
  background-image: url('/bg_mobile.png');
  background-size: 100%;
  background-position: center;
}

@media screen and (min-width: 992px){
  #mainFrame {
    background-image: url('/bg_desktop.png');
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