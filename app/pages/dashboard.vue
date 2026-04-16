<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-20 bg-white shadow flex flex-col items-center py-6 gap-6">
      <NuxtLink to="/dashboard">
        <div
          class="w-12 h-10 bg-black rounded-xl flex items-center justify-center text-white text-xs font-bold"
        >
          DB
        </div>
      </NuxtLink>
      <NuxtLink to="/transactions">
        <div
          class="w-12 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs"
        >
          TX
        </div>
      </NuxtLink>
      <NuxtLink to="/">
        <div
          class="w-12 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs"
        >
          Home
        </div>
      </NuxtLink>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 space-y-6 overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Dashboard</h1>
          <p class="text-sm text-gray-500">{{ today }}</p>
        </div>
        <div class="flex gap-8">
          <div class="text-right">
            <p class="text-xl font-bold">{{ transactions.length }}</p>
            <p class="text-sm text-gray-500">Transactions</p>
          </div>
          <div class="text-right">
            <p class="text-xl font-bold text-green-500">{{ incomeCount }}</p>
            <p class="text-sm text-gray-500">Income</p>
          </div>
          <div class="text-right">
            <p class="text-xl font-bold text-red-500">{{ expenseCount }}</p>
            <p class="text-sm text-gray-500">Expenses</p>
          </div>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card 1 — Balance Overview -->
        <Card title="Balance Overview">
          <div
            class="text-3xl font-bold mb-4"
            :class="total >= 0 ? 'text-green-600' : 'text-red-600'"
          >
            {{ $currency(total) }}
          </div>
          <div class="flex justify-between mt-2">
            <div>
              <p class="text-sm text-gray-500">Total Income</p>
              <p class="font-bold text-green-500">
                {{ $currency(totalIncome) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Total Expenses</p>
              <p class="font-bold text-red-500">
                {{ $currency(totalExpenses) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Savings Rate</p>
              <p class="font-bold">{{ savingsRate }}%</p>
            </div>
          </div>
        </Card>

        <!-- Card 2 — Donut Chart -->
        <Card title="Income vs Expenses">
          <TransactionDonut :transactions="transactions" />
        </Card>

        <!-- Card 3 — Line Chart -->
        <Card title="Trends Over Time">
          <TransactionChart :transactions="transactions" />
        </Card>

        <!-- Card 4 — Recent Transactions -->
        <Card title="Recent Transactions">
          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div
              v-if="transactions.length === 0"
              class="text-gray-400 text-sm text-center py-4"
            >
              No transactions yet
            </div>
            <div
              v-for="t in recentTransactions"
              :key="t.id"
              class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p class="font-medium text-sm">{{ t.text }}</p>
                <p class="text-xs text-gray-400">
                  {{
                    t.createdAt
                      ? new Date(t.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "No date"
                  }}
                </p>
              </div>
              <p
                class="font-semibold text-sm"
                :class="t.amount > 0 ? 'text-green-500' : 'text-red-500'"
              >
                {{ t.amount > 0 ? "+" : "" }}{{ $currency(t.amount) }}
              </p>
            </div>
          </div>
          <NuxtLink
            to="/transactions"
            class="text-xs text-blue-500 hover:underline mt-3 block text-right"
          >
            View all →
          </NuxtLink>
        </Card>

        <!-- Card 5 — Largest Transactions -->
        <Card title="Income">
          <div class="space-y-2">
            <div
              v-for="t in largestIncome"
              :key="t.id"
              class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <p class="text-sm font-medium">{{ t.text }}</p>
              <p class="text-sm font-bold text-green-500">
                +{{ $currency(t.amount) }}
              </p>
            </div>
            <div
              v-if="largestIncome.length === 0"
              class="text-gray-400 text-sm text-center py-4"
            >
              No income yet
            </div>
          </div>
        </Card>

        <!-- Card 6 — Largest Expenses -->
        <Card title="Expenses">
          <div class="space-y-2">
            <div
              v-for="t in largestExpenses"
              :key="t.id"
              class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <p class="text-sm font-medium">{{ t.text }}</p>
              <p class="text-sm font-bold text-red-500">
                {{ $currency(t.amount) }}
              </p>
            </div>
            <div
              v-if="largestExpenses.length === 0"
              class="text-gray-400 text-sm text-center py-4"
            >
              No expenses yet
            </div>
          </div>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "@/components/ui/Card.vue";
import { useTransactions } from "@/composables/useTransactions";
import TransactionChart from "@/components/TransactionChart.vue";
import TransactionDonut from "@/components/TransactionDonut.vue";

definePageMeta({
  middleware: "auth",
});

const { transactions, fetchTransactions } = useTransactions();
const { $currency } = useNuxtApp();
const today = ref(new Date().toDateString());

onMounted(async () => {
  await fetchTransactions();
});

const total = computed(() =>
  transactions.value.reduce((sum, t) => sum + t.amount, 0),
);

const totalIncome = computed(() =>
  transactions.value
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

const totalExpenses = computed(() =>
  transactions.value
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0),
);

const savingsRate = computed(() => {
  if (totalIncome.value === 0) return 0;
  return Math.round(
    ((totalIncome.value - totalExpenses.value) / totalIncome.value) * 100,
  );
});

const incomeCount = computed(
  () => transactions.value.filter((t) => t.amount > 0).length,
);

const expenseCount = computed(
  () => transactions.value.filter((t) => t.amount < 0).length,
);

const recentTransactions = computed(() =>
  [...transactions.value]
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime(),
    )
    .slice(0, 5),
);

const largestIncome = computed(() =>
  [...transactions.value]
    .filter((t) => t.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4),
);

const largestExpenses = computed(() =>
  [...transactions.value]
    .filter((t) => t.amount < 0)
    .sort((a, b) => a.amount - b.amount)
    .slice(0, 4),
);
</script>

<style scoped></style>
