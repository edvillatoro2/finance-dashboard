<template>
  <div>
    <h1>Finance Dashboard</h1>
    <h1>Welcome today is, {{ today }}</h1>
    <section>stats go here</section>
    <section>transactions go here</section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const today = ref(new Date().toDateString());
</script>

<style scoped></style>
