<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-200 to-blue-500 flex items-center justify-center p-6"
  >
    <!-- Glass Card Container -->
    <div
      class="w-full max-w-4xl rounded-3xl p-6 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 text-white">
        <div>
          <h1 class="text-xl font-semibold">My Card</h1>
          <p class="text-sm opacity-70">{{ today }}</p>
        </div>
        <div class="flex gap-2">
          <button
            @click="login"
            class="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            Login
          </button>
          <button
            @click="logout"
            class="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
          >
            Logout
          </button>
        </div>
      </div>
      <!-- Credit Card UI -->
      <div
        class="rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg mb-6"
      >
        <p class="text-sm opacity-80">Balance</p>
        <h2 class="text-3xl font-bold">{{ $currency(total) }}</h2>
        <div class="mt-6 flex justify-between text-sm opacity-80">
          <span>**** 1234</span> <span>12/28</span>
        </div>
      </div>
      <!-- Actions -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <NuxtLink
          to="/dashboard"
          class="bg-white/20 p-3 rounded-xl text-white text-center hover:bg-white/30 transition"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/transactions"
          class="bg-white/20 p-3 rounded-xl text-white text-center hover:bg-white/30 transition"
        >
          Transactions
        </NuxtLink>
        <button
          class="bg-white/20 p-3 rounded-xl text-white hover:bg-white/30 transition"
        >
          Settings
        </button>
      </div>
      <!-- charts -->
      <div class="flex gap-4 mb-6">
        <TransactionDonut class="w-1/3" :transactions="transactions" />
        <TransactionChart class="w-2/3" :transactions="transactions" />
      </div>

      <!-- Transactions Section -->
      <div class="bg-white/10 rounded-2xl p-4 backdrop-blur-lg">
        <div class="flex justify-between items-center mb-4 text-white">
          <h2 class="font-semibold">Recent Transactions</h2>
          <NuxtLink to="/transactions" class="text-sm opacity-70">
            View all
          </NuxtLink>
        </div>
        <TransactionList
          :transactions="transactions"
          @delete="deleteTransaction"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTransactions } from "@/composables/useTransactions";
import TransactionList from "@/components/TransactionList.vue";
import TransactionChart from "@/components/TransactionChart.vue";
import TransactionDonut from "@/components/TransactionDonut.vue";

const auth = useState("auth", () => false);
const today = ref(new Date().toDateString());
const { transactions, deleteTransaction, fetchTransactions } =
  useTransactions();
const { $currency } = useNuxtApp();

await useAsyncData("transactions", fetchTransactions);

const total = computed(() => {
  return transactions.value.reduce((sum, t) => sum + t.amount, 0);
});

const login = () => {
  auth.value = true;
  navigateTo("/dashboard");
};
const logout = () => {
  auth.value = false;
};
</script>

<style scoped></style>
