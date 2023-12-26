<script setup>
import { watch, ref, nextTick } from 'vue';
import Contact from '@/components/Contact.vue'
import githubIcon from '@/assets/github-mark-white.svg';
import behanceIcon from '@/assets/behance.png';

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
    <section class="z-10 w-full invert-target overflow-y-scroll p-2 lg:p-4 bg-dark text-light"
    ref="coverLetter">
        <h2 class="font-light text-3xl lg:text-4xl grid grid-cols-3">
            <button class="toucher bg-lavendar p-2 lg:p-5 rounded-full w-fit flex col-start-4 lg:col-start-1"
            @click="emits('close')">
                <span class="material-symbols-outlined align-middle">
                    close
                </span>
            </button>
            <div class="flex gap-2 flex-col lg:flex-row col-span-3 lg:col-span-2 lg:col-start-2">
                <span>Lucien Hsieh</span>
                <span>謝明倫</span>
            </div>
        </h2>
        <div class="grid grid-cols-3 min-h-full">
            <section class="col-span-3 lg:col-span-2 lg:col-start-2">
                <div class="mt-4 lg:mt-0 flex gap-3 items-center">
                    <a href="https://www.behance.net/Lucienming" target="_blank">
                        <img :src="behanceIcon" alt="Behance icon for linkage to Lucien's profile"
                        class="social-icon"/>
                    </a>
                    <a href="https://github.com/ienming" target="_blank">
                        <img :src="githubIcon" alt="Github icon for linkage to Lucien's profile"
                        class="social-icon"/>
                    </a>
                </div>
                <div class="mt-6 mb-10">
                    <p class="mb-3">
                        熟悉用網頁前端技術呈現我在設計、插畫繪本與資料視覺化的興趣，也喜歡用傳統媒材或電繪畫圖。
                        平時是一名負責 UIUX 和前端開發的上班族。
                    </p>
                    <p>
                        I use web frontend technologies to express my interests in design, illustration, story, and
                        data visualization. I also create paintings using traditional media or digital softwares.
                        I am a salaryman as UIUX design and frontend development in Taiwan now.
                    </p>
                </div>
                <Contact class="lg:hidden"></Contact>
            </section>
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