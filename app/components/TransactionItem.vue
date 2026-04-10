<template>
  <li
    class="flex justify-between items-center p-3 border rounded hover:bg-gray-200/20 transition-colors duration-200 cursor-pointer"
  >
    <div class="flex flex-col">
      <span class="font-medium text-white">{{ transaction.text }}</span>
      <span :class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'">
        {{ $currency(transaction.amount) }}
      </span>
      <button
        @click="emit('delete', transaction.id)"
        class="text-red-500 font-semibold bg-gradient-to-r from-red-200 to-purple-100 shadow-lg rounded transition-all duration-900 hover:text-red-700 hover:scale-105 active:scale-90"
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
