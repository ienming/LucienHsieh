<script setup>
import { ref } from 'vue';
const props = defineProps(['collapsed'])
const collapsed = props.collapsed ? ref(props.collapsed) : ref(false)

function toggleCollapsed(){
    collapsed.value = !collapsed.value
}
</script>

<template>
    <div @click="toggleCollapsed">
        <div class="py-3 border-b border-snow-shadow/20 grid">
            <slot name="header"></slot>
            <span class="material-symbols-outlined">
                {{ collapsed ? 'expand_more':'expand_less' }}
            </span>
        </div>
        <slot v-if="!collapsed" name="content"></slot>
    </div>
</template>

<style scoped>
.grid{
    grid-template-columns: auto 5%;
}
</style>