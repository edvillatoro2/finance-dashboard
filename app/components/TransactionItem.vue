<template>
  <li
    class="flex justify-between items-center p-3 border border-white rounded-xl hover:bg-white/10 transition-colors duration-200 cursor-pointer"
  >
    <div class="flex flex-col gap-0.5">
      <span class="font-medium text-white">{{ transaction.text }}</span>
      <span
        class="text-xs"
        :class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'"
      >
        {{ transaction.amount > 0 ? "Income" : "Expense" }}
      </span>
    </div>
    <div class="flex items-center gap-3">
      <span
        class="font-semibold"
        :class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'"
      >
        {{ transaction.amount > 0 ? "+" : ""
        }}{{ $currency(transaction.amount) }}
      </span>
      <button
        @click="emit('delete', transaction.id)"
        class="px-3 py-1.5 text-white text-xs rounded-lg bg-red-500/30 border border-red-500/80 hover:bg-red-600/40 transition-colors duration-200"
      >
        Delete
      </button>
    </div>
  </li>
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transaction";

defineProps<{
  transaction: Transaction;
}>();

// component can emit an event called 'delete',
// must include a number type (id),
// and return nothing
const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();
const { $currency } = useNuxtApp();
</script>

<style scoped></style>
