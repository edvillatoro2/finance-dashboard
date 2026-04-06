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
      <form action="" @submit.prevent="handleSubmit" class="space-y-3 max-w-md">
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

const text = ref("");
const amount = ref(0);
const errorMessage = ref("");
const successMessage = ref("");
const { $currency, $formatDate } = useNuxtApp();

//fetch existing transactions
const { transactions, fetchTransactions, addTransaction } = useTransactions();

onMounted(() => {
  fetchTransactions();
});

const handleSubmit = async () => {
  if (!text.value.trim()) return;
  if (amount.value === 0) return;

  await addTransaction({
    text: text.value,
    amount: amount.value,
  });
  text.value = "";
  amount.value = 0;
};
</script>

<style scoped></style>
