<template>
  <li
    class="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
  >
    <div class="flex flex-col">
      <span class="font-medium text-white">{{ transaction.text }}</span>
      <span :class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'">
        {{ $currency(transaction.amount) }}
      </span>
      <button
        @click="emit('delete', transaction.id)"
        class="text-red-500 bg-red-500/60 rounded transition-all duration-200 hover:text-red-700 hover:scale-110 active:scale-90"
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
