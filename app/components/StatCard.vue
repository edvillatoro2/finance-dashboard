<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
}>();
</script>

<style scoped></style>
