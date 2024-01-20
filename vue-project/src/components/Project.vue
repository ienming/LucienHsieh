<script setup>
import { onMounted, ref, inject, computed } from "vue";
import Badge from "./Badge.vue";

const lang = inject("lang")

const props = defineProps(['title', 'info'])
const emits = defineEmits(['hover', 'leave'])
const coverImg = new URL(`../assets/cover_${props.title}.png`, import.meta.url).href
const maskImg = new URL(`../assets/mask_${props.info.mask}.svg`, import.meta.url).href

const usingMobile = inject("usingMobile")

const canvasRatio = computed(()=>{
    if (usingMobile.value){
        return 1.3
    }else return 1.2
})
const [canvasWidth, canvasHeight] = [
    window.innerHeight/canvasRatio.value,
    window.innerHeight/canvasRatio.value]
const canvas = ref(null)

function viewProject(){
    if (usingMobile.value){
        return
    }else{
        window.open(props.info.url.demo, '_blank')
    }
}

function useCSSCover(){
    const coverEl = document.createElement("div");
    canvas.value.appendChild(coverEl);

    coverEl.style['background-image'] = `url(${coverImg})`;
    coverEl.style['mask-image'] = `url(${maskImg})`;
    coverEl.style['mask-size'] = `contain`;
    coverEl.style['mask-repeat'] = `no-repeat`;
    coverEl.style['mask-position'] = `center`;
    coverEl.classList.add('h-full', 'rounded-full', 'bg-cover', 'bg-center');
}

onMounted(()=>{
    useCSSCover()
})
</script>

<template>
    <section class="w-full relative flex flex-col lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3 p-6 lg:p-10">
        <div ref="canvas"
        class="aspect-square"
        @click="viewProject()"
        @mouseenter="emits('hover')"
        @mouseleave="emits('leave')"></div>
        <div class="flex flex-col items-start justify-center txt-slot-hover gap-2 lg:gap-3 lg:pl-10
        xl:col-span-2">
            <div class="flex gap-2">
                <!-- <Symbol v-for="c of info.cate" :name="c" :key="info.title+'_'+c"></Symbol> -->
            </div>
            <h2 class="fs-h2 p-1 lg:p-4 txt-slot-container bg-light border border-dark"
            :style="usingMobile ? {'--slot-offset': 'calc(-113% + 0.25rem*-1)'} : {'--slot-offset': 'calc(-113% + 1rem*-1)'}">
                <div v-for="n of 2" class="txt-slot flex flex-wrap items-center">
                    <a :href="info.url.demo" target="_blank" class="font-serif font-bold">{{ info.name.zh }}</a>
                    <a :href="info.url.demo" target="_blank" class="font-light text-sm ps-1 lg:ps-2">{{ info.name.en }}</a>
                </div>
            </h2>
            <div class="flex gap-2 text-light">
                <a :href="info.url.demo"
                :class="usingMobile ? '':'hidden'"
                v-if="Object.prototype.hasOwnProperty.call(info.url, 'demo')" target="_blank"
                class="flex gap-1 items-center py-1 px-2 text-sm bg-dark rounded-full">
                    <span class="material-symbols-outlined text-sm">
                        open_in_new
                    </span>
                    Demo</a>
                <a :href="info.url.detail"
                v-if="Object.prototype.hasOwnProperty.call(info.url, 'detail')" target="_blank"
                class="flex gap-1 items-center py-1 px-2 text-sm bg-dark rounded-full">
                    <span class="material-symbols-outlined text-sm">
                        open_in_new
                    </span>
                    Detail</a>
            </div>
            <p v-if="info.intro[lang]"
            class="max-w-[80vw]">
                {{ info.intro[lang] }}
            </p>
            <div class="hidden md:flex gap-2 items-start flex-wrap">
                <Badge v-for="tag of info.tags" :key="tag" :text="tag"></Badge>
            </div>
        </div>
    </section>
</template>