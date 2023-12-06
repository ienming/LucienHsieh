<script setup>
import { watch, ref, nextTick } from 'vue';
import Collapse from './Collapse.vue';
import Contact from './Contact.vue';
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

const contents = {
    "work": {
        title: "工作經驗 Work Experiences",
        ui: "list",
        data: [
            {
                date: "2023.5 ~ 2024.3",
                jobtitle: "網頁釋出系統前端與UIUX",
                workplace: "國家高速網路與計算中心（委外派駐）",
                detail: "主要負責生物網頁釋出系統改版的前端網頁開發、介面原型和使用者需求整理，並支援活動網頁和相關圖案設計。",
                collapsed: false
            }
        ]
    },
    "skill": {
        title: "技能 Skills & Preferred Tools",
        ui: "badge",
        data: {
            "Vue": "bg-lavendar",
            "GSAP": "bg-lavendar",
            "PIXI": "bg-lavendar",
            "p5.js": "bg-lavendar",
            "JavaScript": "bg-lavendar",
            "Python": "bg-lavendar",
            "CSS": "bg-lavendar",
            "Bootstrap 5": "bg-lavendar",
            "Tailwind": "bg-lavendar",
            "HTML": "bg-lavendar",
            "Figma": "bg-gold"
        }
    },
    "edu": {
        title: "教育背景 Education",
        ui: "list",
        data: [
            {
                date: "2020.9 ~ 2023.3",
                degree: "碩士",
                department: "媒體與互動設計，國立成功大學，創意產業設計研究所（NCKU, ICID）"
            },
            {
                date: "2014.9 ~ 2019.1",
                degree: "學士",
                department: "數位內容與科技，國立政治大學（NCCU, DCT）"
            },
            {
                date: "2014.9 ~ 2019.1",
                degree: "學士",
                department: "媒體與文化研究，國立政治大學，新聞學系（NCCU, Department of Journalism）"
            }
        ]
    }
}
</script>

<template>
    <section class="z-10 w-full invert-target overflow-y-scroll p-4 bg-dark text-light"
    ref="coverLetter">
        <h2 class="font-light text-4xl grid grid-cols-3">
            <button class="toucher bg-lavendar p-5 rounded-full w-fit flex col-start-4 lg:col-start-1"
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
                <div class="my-10">
                    <p>
                        中文自我介紹
                    </p>
                    <p>
                        Autobiography
                    </p>
                </div>
                <div class="mb-8" v-for="(cv, key) of contents" :key="cv.title">
                    <h5 class="text-snow-shadow font-semibold mb-2">{{ cv.title }}</h5>
                    <div v-if="key === 'work'">
                        <Collapse v-for="exp of cv.data"
                        :key="exp.jobtitle"
                        :collapsed="exp.collapsed">
                            <template v-slot:header>
                                <div class="grid grid-cols-1 lg:grid-cols-3 hover:text-snow-shadow">
                                    <span class="text-snow-shadow">{{exp.date}}</span>
                                    <span class="pt-2 lg:pt-0">{{ exp.jobtitle }}</span>
                                    <span>{{ exp.workplace }}</span>
                                </div>
                            </template>
                            <template v-slot:content>
                                <div class="px-0 lg:p-3">
                                    {{ exp.detail }}
                                </div>
                            </template>
                        </Collapse>
                    </div>
                    <div v-else-if="key === 'edu'">
                        <div class="grid grid-cols-2 lg:grid-cols-5 py-3 border-b border-snow-shadow/20"
                        v-for="edu of cv.data"
                        :key="edu.jobtitle">
                            <span class="text-snow-shadow">{{edu.date}}</span>
                            <span>{{ edu.degree }}</span>
                            <span class="col-span-3 pt-2 lg:pt-0">{{ edu.department }}</span>
                        </div>
                    </div>
                    <div v-else class="flex gap-3 flex-wrap">
                        <span v-for="(value, key) of cv.data"
                        class="py-1 px-2 rounded-full" :class="value">
                            {{ key }}
                        </span>
                    </div>
                </div>
                <Contact class="lg:hidden"></Contact>
            </section>
        </div>
    </section>
</template>