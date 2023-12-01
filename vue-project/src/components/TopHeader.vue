<script setup>
import { storeIcon } from '../store';

const props = defineProps(['currentTab'])
const emits = defineEmits(['switch-tab'])

const tabs = ["all", "code", "design"];
const link_behance = {
  text: "VIEW ALL PROJECTS ON BEHANCE",
  url: "https://www.behance.net/Lucienming",
};

function switchTab(tabName){
  emits('switch-tab', tabName)
  if (tabName !== 'all'){
    storeIcon.switchIcon(tabName)
  }
}
</script>

<template>
  <section class="border-b-2 border-dark w-full grid relative z-10">
    <div class="font-display font-thin text-4xl flex overflow-hidden border-b-2 border-dark lg:border-b-0 bg-lavendar lg:bg-light">
      <span class="marquee inline-block whitespace-nowrap" v-for="n of 3">
        <span class="flex gap-2 ps-3 leading-normal">
          <span class="text-light lg:text-lavendar">Portfolio Lucien Hsieh 2023 WEB & DESIGN</span>
        </span>
      </span>
    </div>
    <nav class="lg:border-l-2 border-dark flex flex-col">
      <div class="grid grid-cols-3 border-b-2 border-dark bg-light">
        <button
          v-for="(tab, id) of tabs"
          :key="tab"
          class="hov-el text-center font-semibold border-dark py-2 lg:py-1 txt-slot-container txt-slot-hover"
          :class="{ 'border-l-2': id !== 0, 'bg-dark': tab === props.currentTab, 'text-snow-shadow': tab === props.currentTab }"
          @click="switchTab(tab)"
        >
          <span v-for="n of 2" class="txt-slot ps-2">{{ tab.toUpperCase() }}</span>
        </button>
      </div>
      <a
        :href="link_behance.url"
        target="_blank"
        class="hov-el px-2 py-2 lg:py-1 txt-slot-container txt-slot-hover"
        style="line-height: 1.5;"
      >
        <span v-for="n of 2" class="txt-slot flex gap-1 items-center">
          <span class="font-semibold">
            {{ link_behance.text }}
          </span>
          <span class="material-symbols-outlined"> open_in_new </span>
        </span>
      </a>
    </nav>
  </section>
</template>

<style scoped>
@media screen and (min-width: 992px) {
  section {
    grid-template-columns: auto 35%;
  }
}

.marquee {
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.hov-el {
  position: relative;
}

.hov-el.active::after{
  background-color: var(--luc-dark);
}

.hov-el.active::after {
  width: 100%;
}

.hov-el:hover::after {
  width: 100%;
}

.hov-el::after {
  content: "";
  z-index: -1;
  display: block;
  background-color: var(--luc-snow-shadow);
  position: absolute;
  width: 0%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.3s ease;
}
</style>