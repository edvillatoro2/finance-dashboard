<template>
  <div>
    <p>{{ transaction?.text }}</p>
    <p>{{ transaction?.amount }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: transaction } = await useFetch(
  `/api/transactions/${route.params.id}`,
);
</script>

<style scoped></style>
