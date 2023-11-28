<script setup>
import dashImg from '../assets/dash.png'
</script>

<template>
    <section class="p-2 txt-slot-hover">
        <div class="p-2">
            <h4 class="font-sans text-xl font-semibold flex gap-2 items-center">
                <div class="txt-slot-container">
                    <span v-for="n of 2" class="txt-slot">Contact</span>
                </div>
                <img :src="dashImg" alt="">
            </h4>
            <div class="flex gap-1 mt-1">
                <span class="underline underline-offset-2">hsieh.alan.0726@gmail.com</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background-image: url("../assets/bg_contact.png");
    background-size: 110% 150%;
    background-position: center;
    background-repeat: no-repeat;
}
</style>