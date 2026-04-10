<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white flex justify-center items-center p-6"
  >
    <!-- Glass Card Container -->
    <div
      class="group relative w-full max-w-4xl rounded-3xl p-6 bg-white/10 backdrop-blur-xl shadow-4xl border border-white/20 transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.025]"
    >
      <!-- Glow (applies to entire card) -->
      <div
        class="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 blur-2xl"
      />

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-xl font-semibold">My Card</h1>
            <p class="text-sm text-gray-300">{{ today }}</p>
          </div>

          <div class="flex gap-2">
            <button
              @click="login"
              class="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
            >
              Login
            </button>

            <button
              @click="logout"
              class="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Credit Card UI -->
        <div
          class="rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg mb-6 transition-all duration-1000 hover:bg-gradient-to-l hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:shadow-2xl"
        >
          <p class="text-sm opacity-80">Balance</p>
          <h2 class="text-3xl font-bold tracking-tight">
            {{ $currency(total) }}
          </h2>

          <div class="mt-6 flex justify-between text-sm opacity-80">
            <span>**** 1234</span>
            <span>12/28</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-3 gap-3 mb-6">
          <NuxtLink
            to="/dashboard"
            class="bg-white/20 p-3 rounded-xl text-center hover:bg-white/30 transition-colors duration-200"
          >
            Dashboard
          </NuxtLink>

          <NuxtLink
            to="/transactions"
            class="bg-white/20 p-3 rounded-xl text-center hover:bg-white/30 transition-colors duration-200"
          >
            Transactions
          </NuxtLink>

          <button
            class="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-colors duration-200"
          >
            Settings
          </button>
        </div>

        <!-- Charts -->
        <div class="flex gap-4 mb-6">
          <div class="w-1/3 bg-white/10 rounded-2xl p-4 backdrop-blur-lg">
            <TransactionDonut :transactions="transactions" />
          </div>

          <div class="w-2/3 bg-white/10 rounded-2xl p-4 backdrop-blur-lg">
            <TransactionChart :transactions="transactions" />
          </div>
        </div>

        <!-- Transactions -->
        <div class="bg-white/10 rounded-2xl p-4 backdrop-blur-lg">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-semibold">Recent Transactions</h2>
            <NuxtLink
              to="/transactions"
              class="text-sm text-gray-300 hover:text-white transition-colors"
            >
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

await useAsyncData("transactions", async () => {
  await fetchTransactions();
  return true;
});

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
