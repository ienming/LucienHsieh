<script setup>
import { ref }from 'vue';
import { storeCV } from '../store';
import Navs from './Navs.vue';
import IconMarquee from '@/components/icons/IconMarquee.vue';

const emits = defineEmits(['switch-tab'])

const menuOpening = ref(false)

function switchTab(tabName){
  emits('switch-tab', tabName)
}
</script>

<template>
  <section class="border-b-2 border-dark w-full grid relative z-10"
  id="topHeader"
  :style="storeCV.show ? {'grid-template-columns': '100%'}:''">
    <div class="fs-d1 flex overflow-hidden border-b-2 border-dark lg:border-b-0 bg-dark lg:bg-light">
      <span class="marquee inline-block whitespace-nowrap self-center" v-for="n of 3">
        <span class="flex items-center gap-2 ps-3 leading-normal">
          <span class="text-light lg:text-dark flex items-center gap-1">
            <span>Portfolio Lucien Hsieh 2023</span>
            <span>WEB FRONTEND</span>
            <span>&</span>
            <span>ILLUSTRATION</span>
            <IconMarquee></IconMarquee>
          </span>
        </span>
      </span>
    </div>
    <section>
      <nav class="bg-dark text-light flex justify-center items-center lg:hidden h-full"
      v-show="!storeCV.show"
      @click="menuOpening = !menuOpening">
        <span v-if="!menuOpening" class="material-symbols-outlined"> menu </span>
        <span v-else class="material-symbols-outlined"> close </span>
      </nav>
      <!-- Desktop -->
      <Navs v-show="!storeCV.show" class="lg:border-l-2 hidden lg:flex flex-col h-full"
      @switch-tab="switchTab"></Navs>
    </section>
    <!-- Mobile -->
    <div class="absolute top-full w-full bg-light">
      <Navs v-show="menuOpening" class="flex flex-col"
      @switch-tab="switchTab"></Navs>
    </div>
  </section>
</template>

<style scoped>
#topHeader {
  grid-template-columns: auto 48px;
}
@media screen and (min-width: 992px) {
  #topHeader {
    grid-template-columns: repeat(2, 1fr);
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
</style>