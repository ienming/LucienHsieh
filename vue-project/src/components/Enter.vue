<script setup>
import { nextTick, onMounted } from 'vue';
import { gsap } from 'gsap';

const emits = defineEmits(['finish', 'start'])

onMounted(() => {
    nextTick(() => {
        let tweenText = gsap.from(".anim-text", {
            opacity: 0,
            y: '10px',
            stagger: .1,
            duration: .5,
            ease: "power2.out"
        })
        let tweenBg = gsap.to(".anim-enter", {
            "--mask-start": "100%",
            duration: 2,
            ease: "power3.out",
            onStart: () => emits('start'),
            onComplete: () => emits('finish')
        })
        let tl = gsap.timeline()
        tl.add(tweenText, "+=0.5")
        .add(tweenBg, "+=0.5")
    })
})
</script>

<template>
    <section class="z-20 h-full w-full flex justify-center items-center bg-dark anim-enter">
        <div class="text-light text-2xl font-display">
            <div class="flex flex-col gap-3 justify-center items-center">
                <h1 class="anim-text">LUCIEN PORTFOLIO</h1>
                <h2 class="anim-text">2023</h2>
            </div>
        </div>
    </section>
</template>

<style scoped>
.anim-enter {
    --mask-start: 0%;
    -webkit-mask-image: radial-gradient(circle, transparent var(--mask-start), black 0%);
    mask-image: radial-gradient(circle, transparent var(--mask-start), black 0%);
}
</style>