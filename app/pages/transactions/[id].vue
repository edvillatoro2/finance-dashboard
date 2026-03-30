<template>
  <div>
    <h1>ID: {{ route.params.id }}</h1>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
