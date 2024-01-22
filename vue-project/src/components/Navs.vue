<script setup>
import { inject } from 'vue';
const emits = defineEmits(['switch-tab'])
const currentTab = inject("currentTab")

const tabs = ["all", "commercial", "personal"];
const link_behance = {
    text: "VIEW ALL WORKS",
    url: "https://www.behance.net/Lucienming",
};

function switchTab(tabName){
  emits('switch-tab', tabName)
}
</script>

<template>
    <nav class="border-dark">
        <div class="grid grid-cols-[repeat(3,_auto)] lg:grid-cols-3 border-b-2 border-dark bg-light lg:h-full">
            <button v-for="(tab, id) of tabs" :key="tab"
                class="hov-el text-sm text-center font-semibold border-dark py-3 lg:py-1 txt-slot-container txt-slot-hover"
                :class="{ 'border-l-2': id !== 0, 'active': tab === currentTab}"
                @click="switchTab(tab)">
                <span v-for="n of 2" class="txt-slot ps-2 flex gap-1 items-center">
                  <span>{{ tab.toUpperCase() }}</span>
                </span>
            </button>
        </div>
        <a :href="link_behance.url" target="_blank"
            class="hov-el px-2 py-3 lg:py-1 text-sm txt-slot-container txt-slot-hover border-b-2 border-dark lg:border-0 h-full"
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
  span {
    z-index: 1;
  }
  &.active{
    background-color: var(--luc-dark);
    color: var(--luc-light);
    &::after{
      background-color: var(--luc-dark);
      width: 100%;
    }
  }
  &:not(.active):hover {
    color: var(--luc-dynamic-text-color);
    &::after{
      width: 100%;
    }
  }
  &::after{
    content: "";
    display: block;
    background-color: var(--luc-dynamic-bg-color);
    position: absolute;
    width: 0%;
    height: 100%;
    top: 0;
    left: 0;
    transition: 0.3s ease;
  }
}
</style>