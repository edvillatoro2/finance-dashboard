<template>
  <div
    class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4"
  >
    <DonutChart
      :data="chartData"
      :categories="categories"
      :height="220"
      :radius="60"
      :pad-angle="0.1"
      :arc-width="20"
    >
      <div class="text-center text-white">
        <div class="font-semibold">{{ $currency(total) }}</div>
        <div class="text-sm opacity-60">Net Balance</div>
      </div>
    </DonutChart>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Transaction } from "~/types/transaction";

const props = defineProps<{
  transactions: Transaction[];
}>();

const { $currency } = useNuxtApp();

const income = computed(() =>
  props.transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

const expense = computed(() =>
  props.transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0),
);

const total = computed(() => income.value - expense.value);

const chartData = computed(() => [income.value, expense.value]);

const categories = {
  income: {
    name: "Income",
    color: "#22c55e",
  },
  expense: {
    name: "Expenses",
    color: "#ef4444",
  },
};
</script>
