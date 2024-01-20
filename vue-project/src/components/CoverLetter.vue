<script setup>
import { watch, ref, nextTick } from 'vue';
import Contact from '@/components/Contact.vue'
import IconKeshigomu from '@/components/icons/IconKeshigomu.vue';
import IconEscapeKey from '@/components/icons/IconEscapeKey.vue';
import IconStroke1 from '@/components/icons/IconStroke1.vue';
import IconStroke2 from '@/components/icons/IconStroke2.vue';
import githubIcon from '@/assets/github-mark-white.svg';
import behanceIcon from '@/assets/behance.png';
import { setLightTheme } from '@/methods/color.js';

const props = defineProps(['show'])
const emits = defineEmits(['close'])

const coverLetter = ref(null)

watch(() => props.show, (newValue, oldValue)=>{
    if (newValue){
        nextTick(()=>{
            const mainEl = document.querySelector("#mainFrame")
            const topEl = document.querySelector("#topHeader")
            const h = mainEl.clientHeight - topEl.clientHeight
            coverLetter.value.style.height = h+'px'
        })
    }
})
</script>

<template>
    <section class="z-10 p-8 lg:p-0 lg:flex justify-center items-center relative overflow-y-scroll"
    ref="coverLetter">
        <button class="toucher p-2 lg:p-5 rounded-full w-fit absolute right-0 top-0"
        @click="emits('close')">
            <span class="material-symbols-outlined align-middle">
                close
            </span>
        </button>
        <div class="lg:max-w-[50vw]">
            <div class="lg:pb-12 inline-flex justify-end w-full">
                <IconKeshigomu class="toucher" @click="setLightTheme"></IconKeshigomu>
            </div>
            <h2 class="fs-h3 mb-3">
                <span class="pr-3">Lucien Hsieh</span>
                <span>謝明倫</span>
            </h2>
            <div class="mb-3">
                <p class="mb-1">
                    喜歡用網頁前端技術呈現我在設計、插畫繪本與資料視覺化的興趣，也喜歡用傳統媒材或電繪畫圖。
                    平時是一名負責 UIUX 和前端開發的上班族。
                </p>
                <p>
                    I use web frontend technologies to express my interests in design, illustration, story, and
                    data visualization. I also create paintings using traditional media or digital softwares.
                    I am a salaryman as UIUX design and frontend development in Taiwan now.
                </p>
            </div>
            <div class="flex gap-3 items-center">
                <a href="https://www.behance.net/Lucienming" target="_blank">
                    <img :src="behanceIcon" alt="Behance icon for linkage to Lucien's profile"
                    class="social-icon"/>
                </a>
                <a href="https://github.com/ienming" target="_blank">
                    <img :src="githubIcon" alt="Github icon for linkage to Lucien's profile"
                    class="social-icon"/>
                </a>
            </div>
            <div>
                <IconStroke1></IconStroke1>
                <IconStroke2></IconStroke2>
            </div>
            <Contact class="lg:hidden"></Contact>
            <div class="lg:pt-12">
                <IconEscapeKey class="toucher" @click="emits('close')"></IconEscapeKey>
            </div>
        </div>
    </section>
</template>

<style scoped>
.social-icon{
    opacity: 1;
    width: 24px;
}
.social-icon:hover{
    opacity: 0.5;
}
</style>