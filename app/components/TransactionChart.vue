<template>
  <div class="w-full">
    <BarChart
      :data="chartData"
      :height="300"
      :categories="categories"
      :y-axis="['income', 'expense']"
      :group-padding="0"
      :bar-padding="0.2"
      :radius="4"
      :y-grid-line="true"
      :x-formatter="xFormatter"
      :legend-position="LegendPosition.TopRight"
      x-label="Date"
      y-label="Amount"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Transaction } from "~/types/transaction";

const props = defineProps<{
  transactions: Transaction[];
}>();

const sorted = computed(() =>
  [...props.transactions].sort(
    (a, b) =>
      new Date(a.createdAt ?? 0).getTime() -
      new Date(b.createdAt ?? 0).getTime(),
  ),
);

const chartData = computed(() =>
  sorted.value.map((t) => ({
    date: t.createdAt ?? "",
    income: t.amount > 0 ? t.amount : 0,
    expense: t.amount < 0 ? Math.abs(t.amount) : 0,
  })),
);

const xFormatter = (i: number): string => {
  const item = chartData.value[i];
  if (!item?.date) return "";
  return new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const categories = {
  income: { name: "Income", color: "#22c55e" },
  expense: { name: "Expenses", color: "#ef4444" },
};
</script>
