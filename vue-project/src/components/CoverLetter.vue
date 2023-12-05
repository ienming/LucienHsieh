<script setup>
import { onMounted, ref, nextTick } from 'vue';
import Collapse from './Collapse.vue';
const emits = defineEmits(['close'])

const coverLetter = ref(null)
onMounted(()=>{
    const mainEl = document.querySelector("#mainFrame")
    const topEl = document.querySelector("#topHeader")

    const h = mainEl.clientHeight - topEl.clientHeight
    nextTick(()=>{
        coverLetter.value.style.height = h+'px'
    })
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
                detail: "Detail description",
                collapsed: false
            }
        ]
    },
    "skill": {
        title: "技能 Skills & Preferred Tools",
        ui: "badge",
        data: {
            "Vue": "gold",
            "GSAP": "gold",
            "PIXI": "gold",
            "p5.js": "gold",
            "JavaScript": "gold",
            "Python": "gold",
            "CSS": "gold",
            "Bootstrap 5": "gold",
            "Tailwind": "gold",
            "HTML": "gold",
            "Figma": "lavendar"
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
    <section class="z-10 w-full invert-target overflow-y-scroll"
    ref="coverLetter">
        <div class="p-4 bg-dark text-light grid grid-cols-3 min-h-full">
            <section class="col-start-1 col-end-3">
                <div class="my-5">
                    <h2 class="font-light text-4xl mb-10">Lucien Hsieh</h2>
                    <p>
                        中文自我介紹
                    </p>
                    <p>
                        Autobiography
                    </p>
                </div>
                <div class="mb-8" v-for="(cv, key) of contents" :key="cv.title">
                    <h5 class="text-snow-shadow font-semibold mb-4">{{ cv.title }}</h5>
                    <div v-if="key === 'work'">
                        <Collapse v-for="exp of cv.data"
                        :key="exp.jobtitle"
                        :collapsed="exp.collapsed">
                            <template v-slot:header>
                                <div class="grid grid-cols-3 hover:text-snow-shadow">
                                    <span class="text-snow-shadow">{{exp.date}}</span>
                                    <span>{{ exp.jobtitle }}</span>
                                    <span>{{ exp.workplace }}</span>
                                </div>
                            </template>
                            <template v-slot:content>
                                <div class="p-3">
                                    {{ exp.detail }}
                                </div>
                            </template>
                        </Collapse>
                    </div>
                    <div v-else-if="key === 'edu'">
                        <div class="grid grid-cols-5 py-3 border-b border-snow-shadow/20"
                        v-for="edu of cv.data"
                        :key="edu.jobtitle">
                            <span class="text-snow-shadow">{{edu.date}}</span>
                            <span>{{ edu.degree }}</span>
                            <span class="col-span-3">{{ edu.department }}</span>
                        </div>
                    </div>
                    <div v-else class="flex gap-3 flex-wrap">
                        <span v-for="(value, key) of cv.data"
                        class="p-3 rounded-full" :class="'bg-'+value">
                            {{ key }}
                            <span class="hidden">{{ value }}</span>
                        </span>
                    </div>
                </div>
            </section>
            <section>
                <button class="toucher bg-lavendar p-5 rounded-full float-right"
                @click="emits('close')">
                    <span class="material-symbols-outlined align-middle">
                        close
                    </span>
                </button>
            </section>
        </div>
    </section>
</template>