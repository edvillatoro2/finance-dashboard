<template>
  <div>
    <LineChart
      :data="chartData"
      :categories="categories"
      :height="300"
      xKey="date"
      xLabel="Transactions"
      yLabel="Amount"
      :curve-type="CurveType.MonotoneX"
      :stacked="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Transaction } from "~/types/transaction";

const props = defineProps<{
  transactions: Transaction[];
}>();

const chartData = computed(() =>
  props.transactions.map((t, i) => ({
    date: `T${i + 1}`,
    income: t.amount > 0 ? t.amount : 0,
    expense: t.amount < 0 ? Math.abs(t.amount) : 0,
  })),
);

const categories = {
  income: { name: "Income", color: "#22c55e" },
  expense: { name: "Expenses", color: "#ef4444" },
};
</script>
