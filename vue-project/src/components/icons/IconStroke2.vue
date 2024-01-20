<script setup>
import { nextTick, ref, onMounted } from 'vue';
import { setDynamicColor, getRandomColor } from '@/methods/color.js';
import { setDrawSvgLine } from '@/methods/svg.js';

const icon = ref(null)
function dynamicColor(){
    const compStyle = window.getComputedStyle(icon.value.querySelector("path"))
    const color = compStyle.getPropertyValue("stroke")
    setDynamicColor(color)
}

onMounted(()=>{
    nextTick(()=>{
        const paths = icon.value.querySelectorAll(".draw-svg-line")
        setDrawSvgLine(paths)
        Array.from(paths).forEach(path => {
            path.style['stroke'] = getRandomColor()
        })
    })
})
</script>
<template>
    <svg @click="dynamicColor" ref="icon" width="156" height="79" viewBox="0 0 156 79" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="draw-svg-line" d="M12 55.6363C19.5 46.5 17.7344 48.6188 19.5 46.5C27.1987 37.2616 33.8724 32.5954 43.4972 25.5105C49.0129 21.4503 54.8909 17.6425 61.3716 15.3162C64.1536 14.3175 70.7271 11.1685 73.7145 12.2076C76.0502 13.02 67.9483 20.2594 67.543 20.6647C61.4932 26.7146 57.1608 32.8702 52.9601 40.3677C49.93 45.7758 47.1548 51.3195 44.1372 56.7334C42.3981 59.8537 39.482 63.2114 38.4229 66.6535C37.6578 69.14 45.7248 62.9108 46.3772 62.0363C53.2494 52.8247 60.3553 45.9609 69.5087 38.8591C72.4126 36.6061 93.4631 20.7229 93.4631 31.5905C93.4631 37.0685 90.9455 39.5718 87.9774 43.9791C84.9854 48.4217 78.1312 56.4726 77.8288 62.2192C77.6444 65.7222 83.0138 62.8899 84.5488 62.082C94.8209 56.6756 104.259 49.1567 113.852 42.6534C123.403 36.1781 134.595 33.4245 144.48 28.4819" stroke="#3B6796" stroke-width="23" stroke-linecap="round"/>
    </svg>
</template>