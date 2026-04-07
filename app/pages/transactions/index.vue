<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Header -->
      <h1 class="text-2xl font-bold">Finance Dashboard</h1>

      <!-- Form Card -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-3">Add Transaction</h2>

        <form @submit.prevent="handleSubmit" class="space-y-3">
          <input
            v-model="text"
            placeholder="Transaction text"
            type="text"
            class="w-full border p-2 rounded"
          />
          <input
            v-model.number="amount"
            placeholder="Amount"
            type="number"
            class="w-full border p-2 rounded"
          />

          <button
            :disabled="loadingSubmit"
            class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {{ loadingSubmit ? "Adding..." : "Add transaction" }}
          </button>
        </form>

        <p v-if="errorMessage" class="text-red-500 mt-2">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="text-green-500 mt-2">
          {{ successMessage }}
        </p>
      </div>

      <!-- Transactions Card -->
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-semibold mb-3">Transactions</h2>

        <TransactionList :transactions="transactions" @delete="handleDelete" />
      </div>
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
const { $currency } = useNuxtApp();

//fetch existing transactions
const { transactions, fetchTransactions, addTransaction, deleteTransaction } =
  useTransactions();

onMounted(() => {
  fetchTransactions();
});

const loadingSubmit = ref(false);

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!text.value.trim()) {
    errorMessage.value = "Transaction text is required.";
    return;
  }
  if (amount.value === 0) {
    errorMessage.value = "Amount cannot be 0";
    return;
  }

  loadingSubmit.value = true;

  try {
    await addTransaction({
      text: text.value,
      amount: amount.value,
    });
    successMessage.value = "Transaction added successfully!";
    text.value = "";
    amount.value = 0;
  } catch (error) {
    errorMessage.value = "Failed to add transaction.";
  }

  loadingSubmit.value = false;
};

const handleDelete = (id: number) => {
  if (confirm("Are you sure you want to delete this transaction?")) {
    deleteTransaction(id);
  }
};
</script>

<style scoped></style>
