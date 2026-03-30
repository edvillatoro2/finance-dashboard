<template>
  <div>
    <h1>Transactions</h1>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/transactions");
</script>

<style scoped></style>
