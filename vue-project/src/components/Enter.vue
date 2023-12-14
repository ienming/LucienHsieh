<script setup>
import { nextTick, onMounted } from 'vue';
import Symbol from './Symbol.vue';
import { gsap } from 'gsap';

const emits = defineEmits(['finish', 'start'])

onMounted(() => {
        nextTick(()=>{
            gsap.to(".enter-anim", {
                "--mask-start": "100%",
                delay: 1,
                duration: 2,
                ease: "power3.out",
                onStart: () => emits('start'),
                onComplete: () => emits('finish')
        })
    })
})
</script>

<template>
    <section class="z-10 h-full w-full flex justify-center items-center bg-dark enter-anim">
        <div class="text-light text-2xl font-display">
            <div class="flex flex-col gap-3 justify-center items-center">
                <h1>LUCIEN PORTFOLIO</h1>
                <h2>2023</h2>
                <Symbol name="code" :width="48"></Symbol>
                <Symbol name="design" :width="48"></Symbol>
            </div>
        </div>
    </section>
</template>

<style scoped>
.enter-anim {
    --mask-start: 0%;
    -webkit-mask-image: radial-gradient(circle, transparent var(--mask-start), black 0%);
    mask-image: radial-gradient(circle, transparent var(--mask-start), black 0%);
}
</style>