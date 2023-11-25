<script setup>
const emits = defineEmits(['close'])
</script>

<template>
    <section class="w-screen h-screen z-20 bg-dark p-5 text-light">
        <div class="border-2 border-light h-full p-2">
            Cover Letter
            <button class="bg-light text-dark p-2 rounded-lg"
            @click="emits('close')">Close</button>
        </div>
    </section>
</template>