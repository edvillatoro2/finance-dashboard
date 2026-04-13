<template>
  <div
    class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-150 ease-in-out"
  >
    <h2 v-if="title" class="font-semibold capitalize">{{ title }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>
