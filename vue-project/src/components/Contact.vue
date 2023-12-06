<script setup>
</script>

<template>
    <section class="txt-slot-hover bg-snow-shadow text-black">
        <div class="p-2 lg:p-4">
            <h4 class="font-sans text-base lg:text-xl font-semibold mb-2">
                <div class="txt-slot-container">
                    <span v-for="n of 2" class="txt-slot">Contact</span>
                </div>
            </h4>
            <div class="flex gap-1 mt-1">
                <span class="material-symbols-outlined">email</span>
                <span class="underline underline-offset-2">hsieh.alan.0726@gmail.com</span>
            </div>
        </div>
    </section>
</template>