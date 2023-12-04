<script setup>
const emits = defineEmits(['close'])

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
            "Vue": "lavendar",
            "GSAP": "lavendar",
            "PIXI": "lavendar",
            "p5.js": "lavendar",
            "JavaScript": "lavendar",
            "Python": "lavendar",
            "CSS": "lavendar",
            "Bootstrap 5": "lavendar",
            "Tailwind": "lavendar",
            "HTML": "lavendar",
            "Figma": "gold"
        }
    },
    "edu": {
        title: "教育背景 Education",
        ui: "list",
        data: [
            {
                date: "2020.9 ~ 2023.3",
                degree: "Master of Design",
                detail: "國立成功大學 媒體與互動設計，創意產業設計研究所",
                abbr: "NCKU, ICID"
            },
            {
                date: "2014.9 ~ 2019.2",
                degree: "Bachelor of Science",
                detail: "國立政治大學 數位內容與科技學士",
                abbr: "NCCU, DCT"
            },
            {
                date: "2014.9 ~ 2019.2",
                degree: "Bachelor of Art",
                detail: "國立政治大學 媒體與文化研究，新聞學系",
                abbr: "NCCU, Media and Culture Studies"
            }
        ]
    },
    "lang": {
        title: "語言能力 Language",
        ui: "badge",
        data: {
            "TOEFL 100": "lavendar",
            "TOEIC 960": "lavendar",
            "JLPT N2": "gold"
        }
    }
}
</script>

<template>
    <section class="z-20 h-full w-full invert-target"
    ref="coverLetter">
        <div class="p-4 bg-dark text-light grid grid-cols-3">
            <section class="col-start-1 col-end-3">
                <div class="my-5">
                    <h2 class="font-light text-3xl mb-5">Lucien Hsieh</h2>
                    <p>
                        熟悉從設計開始直到完成符合產品需求的前端可互動作品。個性喜歡自由探索與發展想研究的東西，對網頁畫面與互動充滿興趣。
                    </p>
                    <p>
                        Familiar with starting from design to completing front-end interactive works that meet product requirements. I like to freely explore and develop what I want to study, and I am full of interest in web images and interactions.
                    </p>
                </div>
                <div class="mb-5" v-for="cv of contents" :key="cv.title">
                    <h5 class="text-snow-shadow font-semibold">{{ cv.title }}</h5>
                </div>
            </section>
            <section>
                <button class="bg-lavendar p-2 rounded-full float-right"
                @click="emits('close')">
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>
            </section>
        </div>
    </section>
</template>