<template>
  <div class="w-full flex flex-col gap-2 max-w-md">
    <TransactionItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
      @delete="emit('delete', $event)"
    />
    <div
      v-if="!transactions.length"
      class="font-semibold text-md text-center mt-4 text-red-500"
    >
      No transactions found.
    </div>
  </div>
</template>

<script setup lang="ts">
import TransactionItem from "@/components/TransactionItem.vue";
import type { Transaction } from "@/types/transaction";

defineProps<{
  transactions: Transaction[];
}>();

const emit = defineEmits(["delete"]);
</script>

<style scoped></style>
