<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        default: "code"
    },
    width: {
        type: Number,
        default: 24
    },
    colorBg: String,
    colorTop: String
})
const svgContainer = ref(null)
const svgCode = ref("")

function loadIcon(path){
    fetch(path)
    .then((response) => {
        if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }
        return response.text()
    })
    .then((data) => {
        let svg = data.replace('width=\"24\"', `width=\"${props.width}\"`).replace('height=\"24\"', `height=\"${props.width}\"`)
        svgCode.value = svg
    })
    .catch((error) => {
        console.log(error);
    });
}

onMounted(()=>{
    loadIcon(new URL(`../assets/symbol_${props.name}.svg`, import.meta.url).href)

    // Set custom fill to the svg icon
    // let svgFill = this.$refs.svgContainer.getAttribute("data-fill")
    // if (svgFill){
    //     let colorValue;
    //     if (svgFill.startsWith('--')){
    //         colorValue = getComputedStyle(document.documentElement).getPropertyValue(svgFill)
    //     }else if (svgFill.startsWith('#')){
    //         colorValue = svgFill
    //     }
    //     this.$refs.svgContainer.style.setProperty("--twb-icon-fill", colorValue)
    // }
})
</script>

<template>
    <div v-html="svgCode" ref="svgContainer" class="luc-symbol"></div>
</template>

<style scoped>
.luc-symbol{
    --symbol-bg: #000;
    --symbol-top: #ff0000;
}

.luc-symbol path{
    fill: var(--symbol-top);
}

.luc-symbol .symbol-bg{
    fill: var(--symbol-bg);
}
</style>