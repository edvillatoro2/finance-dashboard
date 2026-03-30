<template>
  <div>
    <h1>Transactions</h1>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.text }} - {{ transaction.amount }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data: transactions } = await useFetch("/api/transactions");
</script>

<style scoped></style>
