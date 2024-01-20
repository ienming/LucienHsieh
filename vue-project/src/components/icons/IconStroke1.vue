<script setup>
import { nextTick, ref, onMounted } from 'vue';
import { setDynamicColor } from '@/methods/color.js';
import { setDrawSvgLine } from '@/methods/svg.js';

const icon = ref(null)
function dynamicColor(){
    const color = icon.value.querySelector("path").getAttribute("stroke")
    setDynamicColor(color)
}

onMounted(()=>{
    nextTick(()=>{
        const paths = icon.value.querySelectorAll(".draw-svg-line")
        setDrawSvgLine(paths)
    })
})
</script>
<template>
    <svg @click="dynamicColor" ref="icon" width="74" height="82" viewBox="0 0 74 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="draw-svg-line" d="M12.3363 40.1803C13.9988 46.6942 18.6184 54.1913 22.7524 59.4296C26.3808 64.0274 29.966 71.8761 37.1552 70.0413C40.2344 69.2555 44.247 68.1787 43.2199 64.1543C42.065 59.629 41.0468 54.1804 36.6793 51.589C31.5904 48.5694 29.8423 41.5943 28.4836 36.271C27.5304 32.5359 25.6997 22.9399 32.7002 23.7648C36.2304 24.1808 41.0363 31.9397 43.3243 34.7059C45.5438 37.3894 47.5856 41.9064 50.7532 43.2875C53.975 44.6922 59.7746 44.7883 61.5107 40.8595C63.4215 36.5353 60.171 29.8048 59.0472 25.4015C58.574 23.5475 51.9442 12.4559 50.9243 12.2345" stroke="#C3D9E2" stroke-width="23" stroke-linecap="round"/>
    </svg>
</template>