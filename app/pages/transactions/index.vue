<template>
  <div>
    <h1>Transactions</h1>
    <form action="" @submit.prevent="addTransaction">
      <input
        v-model="text"
        placeholder="Transaction text"
        required
        type="text"
      />
      <input v-model="amount" placeholder="Amount" required type="number" />
      <button type="submit">Add transaction</button>
    </form>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.text }} - {{ transaction.amount }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const text = ref("");
const amount = ref(0);

//fetch existing transactions
const { data: transactions } = await useFetch("/api/transactions");

//post new transaction
const addTransaction = async () => {
  await $fetch("/api/transactions", {
    method: "POST",
    body: { text: text.value, amount: amount.value },
  });

  //refresh transaction list from GET API
  await refresh();

  //reset form
  text.value = "";
  amount.value = 0;
};
</script>

<style scoped></style>
