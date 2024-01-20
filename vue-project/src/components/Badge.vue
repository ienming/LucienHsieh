<script setup>
const props = defineProps(['text'])
</script>

<template>
    <div class="py-1 px-2 lg:py-2 text-sm rounded-full dynamic-color">
        {{ props.text }}
    </div>
</template>