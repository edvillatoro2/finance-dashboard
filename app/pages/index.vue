<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-400/80 to-blue-600 text-white flex justify-center items-center p-4 sm:p-6"
  >
    <!-- Glass Card Container -->
    <div
      class="group relative w-full max-w-7xl rounded-3xl p-4 sm:p-6 bg-white/10 backdrop-blur-xl shadow-6xl border border-white/20 transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.025]"
    >
      <!-- Glow -->
      <div
        class="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 blur-2xl"
      />

      <!-- Content -->
      <div class="relative z-10">
        <!-- Header -->
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
        >
          <div>
            <h1 class="text-lg sm:text-xl font-semibold">
              Welcome to FinTrack
            </h1>
          </div>

          <div class="flex gap-2">
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
          class="rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg mb-6 transition-all duration-1000 hover:bg-gradient-to-l hover:from-indigo-500 hover:via-purple-500 hover:to-pink-600 hover:shadow-2xl"
        >
          <div class="flex justify-between items-center">
            <span>
              <!-- card chip -->
              <svg
                class="w-10 h-8 text-yellow-300"
                viewBox="0 0 50 40"
                fill="none"
              >
                <rect
                  x="1"
                  y="1"
                  width="48"
                  height="38"
                  rx="5"
                  fill="currentColor"
                  opacity="0.9"
                />
                <rect
                  x="15"
                  y="1"
                  width="2"
                  height="38"
                  fill="rgba(0,0,0,0.2)"
                />
                <rect
                  x="33"
                  y="1"
                  width="2"
                  height="38"
                  fill="rgba(0,0,0,0.2)"
                />
                <rect
                  x="1"
                  y="13"
                  width="48"
                  height="2"
                  fill="rgba(0,0,0,0.2)"
                />
                <rect
                  x="1"
                  y="25"
                  width="48"
                  height="2"
                  fill="rgba(0,0,0,0.2)"
                />
                <rect
                  x="17"
                  y="13"
                  width="16"
                  height="14"
                  rx="2"
                  fill="rgba(0,0,0,0.15)"
                />
              </svg>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                class="scale-[0.5]"
              >
                <path
                  fill="none"
                  stroke="#f9f9f9"
                  stroke-width="6"
                  stroke-linecap="round"
                  d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5
  0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
                />
              </svg>
            </span>
          </div>
          <p class="text-sm opacity-80">Balance</p>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">
            <AnimatedNumber :value="total" />
          </h2>

          <div class="mt-6 flex justify-between text-sm opacity-80">
            <span class="text-sm sm:text-md font-semibold">{{
              user?.name ?? "Name"
            }}</span>
            <span>{{ today }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
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

          <!-- <button
            class="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-colors duration-200"
          >
            Settings
          </button> -->
        </div>

        <!-- Charts -->
        <div class="flex flex-col lg:flex-row gap-4 mb-6">
          <div
            class="w-full lg:w-1/3 bg-white/10 rounded-2xl p-4 backdrop-blur-lg"
          >
            <TransactionDonut :transactions="transactions" />
          </div>

          <div
            class="w-full lg:w-2/3 bg-white/10 rounded-2xl p-4 backdrop-blur-lg"
          >
            <TransactionChart :transactions="transactions" />
          </div>
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
import AnimatedNumber from "@/components/ui/AnimateNumber.vue";

definePageMeta({ middleware: "auth" });

const auth = useState("auth", () => false);
const today = ref(new Date().toDateString());
const { transactions, fetchTransactions } = useTransactions();
const { user, clear } = useUserSession();

onMounted(async () => {
  await fetchTransactions();
});

const total = computed(() => {
  return transactions.value.reduce((sum, t) => sum + t.amount, 0);
});
const logout = async () => {
  await $fetch("/api/auth/logout", { method: "POST" });
  await clear();
  navigateTo("/login");
};
</script>

<style scoped></style>
