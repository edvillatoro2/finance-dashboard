<template>
  <div
    class="p-4 flex flex-col gap-6 justify-center items-center bg-white shadow rounded p-4"
  >
    <h1 class="text-xl font-semibold mb-4">Transactions</h1>
    <span v-if="errorMessage" class="text-red-500">
      {{ errorMessage }}
    </span>
    <span v-if="successMessage" class="text-green-500">
      {{ successMessage }}
    </span>
    <div>
      <form
        action=""
        @submit.prevent="addTransaction"
        class="space-y-3 max-w-md"
      >
        <input
          v-model="text"
          placeholder="Transaction text"
          required
          type="text"
          class="w-full border p-2 rounded"
        />
        <input
          v-model.number="amount"
          placeholder="Amount"
          required
          type="number"
          class="w-full border p-2 rounded"
        />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add transaction
        </button>
      </form>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          {{ transaction.text }}
          <span
            :class="transaction.amount < 0 ? 'text-red-500' : 'text-green-500'"
          >
            {{ $currency(transaction.amount) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

import { ref } from "vue";
import { definePage } from "vue-router/dist/experimental/index.js";

const text = ref("");
const amount = ref(0);
const errorMessage = ref("");
const successMessage = ref("");
const { $currency, $formatDate } = useNuxtApp();

//fetch existing transactions
const { data: transactions, refresh } = await useFetch("/api/transactions");

//post new transaction
const addTransaction = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  //error message handling
  if (!text.value.trim()) {
    errorMessage.value = "Description Required";
    return;
  }
  if (amount.value === 0) {
    errorMessage.value = "Amount cannot be 0";
    return;
  }

  await $fetch("/api/transactions", {
    method: "POST",
    body: { text: text.value, amount: amount.value },
  });

  //refresh transaction list from GET API
  await refresh();

  successMessage.value = "Transaction added successfully";

  //reset form
  text.value = "";
  amount.value = 0;
};
</script>

<style scoped></style>
