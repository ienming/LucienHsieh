<script setup>
import { ref } from 'vue';
import Project from '@/components/Project.vue'
import Mouse from '@/components/Mouse.vue'
import projects from '@/assets/projects.json'

const mouseHoverPj = ref(false)
</script>

<template>
  <main>
    <section class="flex gap-40">
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

<style scoped>
</style>