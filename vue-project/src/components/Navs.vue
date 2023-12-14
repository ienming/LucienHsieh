<script setup>
import { inject } from 'vue';
import { storeIcon } from '../store';
import Symbol from './Symbol.vue';
const emits = defineEmits(['switch-tab'])
const currentTab = inject("currentTab")

const tabs = ["all", "code", "design"];
const link_behance = {
    text: "VIEW ALL PROJECTS",
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
    <nav class="border-dark">
        <div class="grid grid-cols-3 border-b-2 border-dark bg-light">
            <button v-for="(tab, id) of tabs" :key="tab"
                class="hov-el text-sm text-center font-semibold border-dark py-3 lg:py-1 txt-slot-container txt-slot-hover"
                :class="{ 'border-l-2': id !== 0, 'bg-dark': tab === currentTab, 'text-snow-shadow': tab === currentTab }"
                @click="switchTab(tab)">
                <span v-for="n of 2" class="txt-slot ps-2 flex gap-1 items-center">
                  <Symbol :name="tab"></Symbol>
                  <span>{{ tab.toUpperCase() }}</span>
                </span>
            </button>
        </div>
        <a :href="link_behance.url" target="_blank"
            class="hov-el px-2 py-3 lg:py-1 text-sm txt-slot-container txt-slot-hover border-b-2 border-dark lg:border-0"
            style="line-height: 1.5;">
            <span v-for="n of 2" class="txt-slot flex gap-1 items-center">
                <span class="font-semibold">
                    {{ link_behance.text }}
                </span>
                <span class="material-symbols-outlined"> open_in_new </span>
            </span>
        </a>
    </nav>
</template>

<style scoped>
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