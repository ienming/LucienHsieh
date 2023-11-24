<script setup>
import { ref } from 'vue';
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import projects from '@/assets/projects.json'
import * as PIXI from "pixi.js";

const mouseHoverPj = ref(false)
</script>

<template>
  <main class="text-cyan-800 border-2 border-cyan-800 h-full">
    <section class="fixed top-1/2 left-0 pl-40 flex gap-20 w-screen overflow-auto"
    style="transform: translateY(-50%)">
      <Project v-for="pj of projects"
      :key="pj.title"
      :title="pj.title"
      :info="{
        'name': pj.name,
        'intro': pj.intro,
        'tags': pj.tags
      }"
      @hover="mouseHoverPj = true"
      @leave="mouseHoverPj = false"/>
    </section>
  </main>
  <Mouse :hover-pj="mouseHoverPj"/>
</template>