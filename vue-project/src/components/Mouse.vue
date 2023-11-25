<script setup>
import { onMounted, watch } from 'vue';
import { gsap } from 'gsap';

const props = defineProps(['hoverPj'])

// Change mouse appearnce while hovering on Project
watch(() => props.hoverPj, (newValue, oldValue) => {
    const color = getComputedStyle(mouseOuter).getPropertyValue('--luc-dark')
    const size = parseInt(getComputedStyle(mouseOuter).getPropertyValue('--size'), 10)
    if (newValue){
        gsap.to(mouseOuter, {
            width: size*3,
            height: size*3,
            backgroundColor: color,
            duration: .2,
            ease: 'power2'
        })
    }else{
        gsap.to(mouseOuter, {
            width: size,
            height: size,
            backgroundColor: 'transparent',
            duration: .2,
            ease: 'power2'
        })
    }
});

// Mouse following
let mouseFollowing = true
let mouseOuter, mouseOuterProperties;

function getProperties(el) {
  return {
    top: el.getBoundingClientRect().top,
    left: el.getBoundingClientRect().left,
    height: el.getBoundingClientRect().height,
    width: el.getBoundingClientRect().width,
  };
}

function followMouse(mouseX, mouseY) {
  gsap.to(mouseOuter, {
    left: (mouseX + window.scrollX) - mouseOuterProperties.width / 2,
    top: (mouseY + window.scrollY) - mouseOuterProperties.height / 2,
    duration: 0.3,
  });
}

onMounted(()=>{
    mouseOuter = document.querySelector(".mouse-outer")
    mouseOuterProperties = getProperties(mouseOuter);

    document.addEventListener("mousemove", function (e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
    
        if (mouseFollowing) {
          followMouse(mouseX, mouseY);
        }
    
        // Gravity element
        // Array.from(targets).forEach(target => {
        //   animateTarget(target, mouseX, mouseY);
        // })
    });
})
</script>

<template>
    <div class="mouse-outer flex justify-center items-center">
        <p v-show="props.hoverPj" class="text-center">View on Behance</p>
        <!-- <div class="mouse-inner"></div> -->
    </div>
</template>

<style scoped>
.mouse-outer {
    --size: 35px;
    pointer-events: none;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    position: absolute;
    z-index: 999;
    border: 2px solid var(--luc-dark);
}

p{
    color: var(--luc-light);
}

.mouse-inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    background-color: var(--luc-dark);
}
</style>