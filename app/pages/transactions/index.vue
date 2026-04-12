<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-600 via-pink-200 to-purple-500 flex items-center justify-center p-6"
  >
    <div
      class="w-full max-w-4xl rounded-3xl p-6 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 text-white">
        <div>
          <h1 class="text-xl font-semibold">Transactions</h1>
          <p class="text-sm opacity-70">Manage your income & expenses</p>
        </div>
        <NuxtLink
          to="/"
          class="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition text-white text-sm"
        >
          ← Back
        </NuxtLink>
      </div>

      <!-- Add Transaction Form -->
      <div class="bg-white/10 rounded-2xl p-4 backdrop-blur-lg mb-6">
        <h2 class="text-white font-semibold mb-4">Add Transaction</h2>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
          <input
            v-model="text"
            placeholder="Description (e.g. Salary, Coffee)"
            type="text"
            class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
          />
          <input
            v-model.number="amount"
            placeholder="Amount (negative for expense, e.g. -50)"
            type="number"
            class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
          />

          <p v-if="errorMessage" class="text-red-300 text-sm">
            {{ errorMessage }}
          </p>
          <p v-if="successMessage" class="text-green-300 text-sm">
            {{ successMessage }}
          </p>

          <button
            type="submit"
            :disabled="loadingSubmit"
            class="w-full py-3 rounded-xl bg-white/30 text-white font-semibold hover:bg-white/40 transition disabled:opacity-50"
          >
            {{ loadingSubmit ? "Adding..." : "Add Transaction" }}
          </button>
        </form>
      </div>

      <!-- Transactions List -->
      <div class="bg-white/10 rounded-2xl p-4 backdrop-blur-lg">
        <h2 class="font-semibold text-white mb-4">All Transactions</h2>
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

//fetch existing transactions
const { transactions, fetchTransactions, addTransaction, deleteTransaction } =
  useTransactions();

onMounted(async () => {
  await fetchTransactions();
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
