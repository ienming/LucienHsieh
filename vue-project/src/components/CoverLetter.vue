<script setup>
const emits = defineEmits(['close'])
</script>

<template>
    <section class="z-20 bg-dark/50 h-screen w-screen flex justify-center items-center backdrop-blur-sm"
    ref="coverLetter">
        <div class="w-1/2 p-4 border-4 border-dark bg-snow-shadow">
            <div class="flex justify-between">
                <span>About</span>
                <button class="bg-light text-dark p-2 rounded-lg"
                @click="emits('close')">Close</button>
            </div>
            <p>
                畢業於政大DCT和成大ICID（媒體與互動設計），從大學開始做網頁，喜歡實現畫面和小動態。 興趣是把日常生活見到的畫面畫下來，偏好不透明顏料。
            </p>
        </div>
    </section>
</template>