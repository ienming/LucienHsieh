<script setup>
const props = defineProps(['data'])
</script>

<template>
    <div class="py-3 border-b border-snow-shadow/20 grid">
        <span v-for="(d, id) of props.data" :key="id"
        :class="{'text-snow-shadow': id==0, 'font-semibold': id==0}"
        >{{ d }}</span>
    </div>
</template>

<style scoped>
.grid{
    grid-template-columns: 15% auto 20% 5%;
}
</style>