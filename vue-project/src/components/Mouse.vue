<script setup>
import { onMounted, watch } from 'vue';
import { gsap } from 'gsap';

const props = defineProps(['hoverPj'])

// Mouse following
let mouseFollowing = true
let mouseOuter, mouseOuterProperties, mouseInner;

// Change mouse appearnce while hovering on Project
watch(() => props.hoverPj, (newValue, oldValue) => {
    const color = getComputedStyle(mouseOuter).getPropertyValue('--mouse-color')
    const size = parseInt(getComputedStyle(mouseOuter).getPropertyValue('--size'), 10)
    if (newValue){
        gsap.to(mouseOuter, {
            width: size*3.5,
            height: size*3.5,
            backgroundColor: color,
            duration: .2,
            ease: 'power2'
        })
        gsap.to(mouseInner, {
          opacity: 0,
          dufation: .2,
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
        gsap.to(mouseInner, {
          opacity: 1,
          dufation: .2,
          ease: 'power2'
        })
    }
});

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

// Gravity grabbing UI
function animateTarget(target, mouseX, mouseY) {
  const { top, left, width, height } = target.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;

  const deltaX = mouseX - centerX;
  const deltaY = mouseY - centerY;

  // 設定吸引區域
  const attractionRadius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);

  if (
    Math.abs(deltaX) < attractionRadius &&
    Math.abs(deltaY) < attractionRadius
  ) {
    const displacementX = (deltaX / attractionRadius) * 20;
    const displacementY = (deltaY / attractionRadius) * 20;
    const skewVolumn = Math.abs(Math.sqrt(deltaX/100))

    gsap.to(target, {
      x: displacementX,
      y: displacementY,
      duration: 0.3,
      ease: "power2.out",
    });
  } else {
    gsap.to(target, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
  }
}

onMounted(()=>{
    mouseOuter = document.querySelector(".mouse-outer")
    mouseInner = document.querySelector(".mouse-inner")
    mouseOuterProperties = getProperties(mouseOuter);

    const rs = getComputedStyle(document.querySelector(":root"))

    const targets = document.querySelectorAll(".toucher");
    const invertTargets = document.querySelectorAll(".invert-target")

    document.addEventListener("mousemove", function (e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
    
        if (mouseFollowing) {
          followMouse(mouseX, mouseY);
        }

        Array.from(targets).forEach(target => {
          animateTarget(target, mouseX, mouseY);
        })
    });

    Array.from(invertTargets).forEach(target => {
      target.addEventListener("mouseenter", ()=>{
        mouseOuter.style.setProperty('--mouse-color', rs.getPropertyValue('--luc-light'))
        mouseOuter.style.setProperty('--text-color', rs.getPropertyValue('--luc-dark'))
      })
      target.addEventListener("mouseleave", ()=>{
        mouseOuter.style.setProperty('--mouse-color', rs.getPropertyValue('--luc-dark'))
        mouseOuter.style.setProperty('--text-color', rs.getPropertyValue('--luc-light'))
      })
    })
  })
</script>

<template>
    <div class="hidden md:flex font-sans mouse-outer justify-center items-center">
        <p v-show="props.hoverPj" class="text-center">View Project</p>
        <div class="mouse-inner"></div>
    </div>
</template>

<style scoped>
.mouse-outer {
    --mouse-color: var(--luc-dark);
    --text-color: var(--luc-light);
    --size: 35px;
    pointer-events: none;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    position: absolute;
    z-index: 999;
    border: 2px solid var(--mouse-color);
}

.mouse-outer > p{
  color: var(--text-color);
}

.mouse-inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    background-color: var(--mouse-color);
}
</style>