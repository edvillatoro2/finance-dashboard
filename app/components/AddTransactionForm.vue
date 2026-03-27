<template>
  <form action="">
    <input v-model="text" placeholder="description" />
    <input v-model.number="amount" type="number" />
    <button>Add</button>
  </form>
</template>

<script setup lang="ts">
const text = ref("");
const amount = ref(0);
</script>

<style scoped></style>
