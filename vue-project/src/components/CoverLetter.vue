<script setup>
import { onMounted, ref, nextTick } from 'vue';
import Collapse from './Collapse.vue';
const emits = defineEmits(['close'])

const coverLetter = ref(null)
onMounted(()=>{
    const mainEl = document.querySelector("#mainFrame")
    const topEl = document.querySelector("#topHeader")

    const mainH = mainEl.clientHeight
    const topH = topEl.clientHeight
    const h = mainH - topH
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
                collapsed: "false"
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
                key: "NCKUICID",
                date: "2020.9 ~ 2023.3",
                degree: "碩士",
                detail: "國立成功大學 媒體與互動設計，創意產業設計研究所",
                abbr: "NCKU, ICID"
            },
            {
                key: "NCCUDCT",
                date: "2014.9 ~ 2019.2",
                degree: "學士",
                detail: "國立政治大學 數位內容與科技學士",
                abbr: "NCCU, DCT"
            },
            {
                key: "NCCUCOMM",
                date: "2014.9 ~ 2019.2",
                degree: "學士",
                detail: "國立政治大學 媒體與文化研究，新聞學系",
                abbr: "NCCU, Media and Culture Studies"
            }
        ]
    },
    "lang": {
        title: "語言能力 Language",
        ui: "badge",
        data: {
            "TOEFL 100": "gold",
            "TOEIC 960": "gold",
            "JLPT N2": "lavendar"
        }
    }
}
</script>

<template>
    <section class="z-10 w-full invert-target overflow-y-scroll"
    ref="coverLetter">
        <div class="p-4 bg-dark text-light grid grid-cols-3">
            <section class="col-start-1 col-end-3">
                <div class="my-5">
                    <h2 class="font-light text-4xl mb-10">Lucien Hsieh</h2>
                    <p>
                        熟悉從設計開始直到完成符合產品需求的前端可互動作品。個性喜歡自由探索與發展想研究的東西，對網頁畫面與互動充滿興趣。
                    </p>
                    <p>
                        Familiar with starting from design to completing front-end interactive works that meet product requirements. I like to freely explore and develop what I want to study, and I am full of interest in web images and interactions.
                    </p>
                </div>
                <div class="mb-8" v-for="(cv, key) of contents" :key="cv.title">
                    <h5 class="text-snow-shadow font-semibold mb-4">{{ cv.title }}</h5>
                    <div v-if="key === 'work'">
                        <Collapse v-for="exp of cv.data"
                        :key="exp.jobtitle"
                        :data="[exp.date, exp.jobtitle, exp.workplace]"/>
                    </div>
                    <div v-else-if="key === 'edu'">
                        <div v-for="edu of cv.data" class="py-3 border-b border-snow-shadow/30 grid"
                        style="grid-template-columns: 15% 15% auto;">
                            <span class="text-snow-shadow font-semibold">{{ edu.date }}</span>
                            <span>{{ edu.degree }}</span>
                            <span>{{ edu.detail }} ({{ edu.abbr }})</span>
                        </div>
                    </div>
                    <div v-else class="flex gap-3 flex-wrap">
                        <span v-for="(value, key) of cv.data"
                        class="p-3 rounded-full" :class="'bg-'+value">{{ key }}</span>
                    </div>
                </div>
            </section>
            <section>
                <button class="target bg-lavendar p-5 rounded-full float-right"
                @click="emits('close')">
                    <span class="material-symbols-outlined align-middle">
                        close
                    </span>
                </button>
            </section>
        </div>
    </section>
</template>