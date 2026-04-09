<template>
  <div>
    <LineChart :data="chartData" :height="300" xLabel="Month" yLabel="Amount" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { LineChart } from "vue-chrts";
import type { Transaction } from "~/types/transaction";

const props = defineProps<{
  transactions: Transaction[];
}>();

const chartData = computed(() => {
  props.transactions.map((transaction) => ({
    name: transaction.text,
    value: transaction.amount,
  }));
});
</script>

<style scoped></style>
