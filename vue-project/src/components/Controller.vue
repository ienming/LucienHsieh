<script setup>
import { ref } from 'vue';
const emits = defineEmits(['show-next', 'show-prev'])

const controllerEl = ref(null)
</script>

<template>
    <section class="absolute bottom-0 left-0 p-3"
    ref="controllerEl">
        <div class="flex flex-col lg:flex-row px-2 py-2 py-lg-0 gap-4 lg:gap-3">
            <div class="flex gap-3 items-center invert-target">
                <span class="hidden lg:inline-block">Backward</span>
                <button class="toucher hover:bg-dark p-4 rounded-full flex items-center"
                @click="emits('show-prev')">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
            </div>
            <div class="flex gap-3 items-center invert-target">
                <button class="toucher hover:bg-dark p-4 rounded-full flex items-center"
                @click="emits('show-next')">
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
                <span class="hidden lg:inline-block">Forward</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
button {
    background-image: url('../assets/bg_controller.png');
    background-size: contain;
    background-repeat: no-repeat;
}
</style>