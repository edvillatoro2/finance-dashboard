<template>
  <div
    class="p-4 flex flex-col gap-6 justify-center items-center bg-white shadow rounded"
  >
    <h1 class="text-xl font-semibold mb-4">Transactions</h1>
    <span v-if="errorMessage" class="text-red-500">
      {{ errorMessage }}
    </span>
    <span v-if="successMessage" class="text-green-500">
      {{ successMessage }}
    </span>
    <div class="w-full max-w-md">
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
          :disabled="loadingSubmit"
        >
          {{ loadingSubmit ? "Adding..." : "Add Transaction" }}
        </button>
      </form>
      <TransactionList
        :transactions="transactions"
        @delete="deleteTransaction"
      />
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
</script>

<style scoped></style>
