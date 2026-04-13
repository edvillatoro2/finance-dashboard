<template>
  <div
    class="bg-gradient-to-b flex items-center justify-center h-full from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 w-full"
  >
    <DonutChart
      :data="chartData"
      :categories="categories"
      :height="220"
      :radius="80"
      :hide-legend="true"
      :pad-angle="0.1"
      :arc-width="20"
    >
      <template #tooltip="{ values }">
        <div class="flex items-center gap-2 p-2">
          <div
            class="size-3 rounded-full"
            :style="{ backgroundColor: categories[values?.label]?.color }"
          />
          <div class="flex flex-col">
            <span class="text-sm font-semibold">{{ values?.label }}</span>
            <span class="text-sm">{{
              values?.label ? $currency(values[values.label]) : ""
            }}</span>
          </div>
        </div>
      </template>
      <div class="text-center text-white">
        <div class="font-bold text-lg">{{ $currency(total) }}</div>
        <div class="text-xs opacity-60 mb-2">Net Balance</div>
        <div class="text-xs">
          <span class="text-green-400">↑ {{ $currency(income) }}</span>
          &nbsp;&nbsp;
          <span class="text-red-400">↓ {{ $currency(expense) }}</span>
        </div>
      </div>
    </DonutChart>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
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

const chartData = ref<number[]>([0, 0]);

watchEffect(() => {
  chartData.value = [income.value, expense.value];
});

const categories: Record<string, { name: string; color: string }> = {
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
