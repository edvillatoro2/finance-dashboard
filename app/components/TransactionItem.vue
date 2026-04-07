<template>
  <div>
    <li
      class="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
    >
      <div class="flex flex-col">
        <span class="font-medium text-white">{{ transaction.text }}</span>
        <span
          :class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'"
        >
          {{ $currency(transaction.amount) }}
        </span>
        <button
          @click="emit('delete', transaction.id)"
          class="text-sm text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  </div>
</template>
<script setup lang="ts">
import type { Transaction } from "@/types/transaction";

defineProps<{
  transactions: Transaction;
}>();

const emit = defineEmits(["delete"]);
const { $currency } = useNuxtApp();
</script>

<style scoped></style>
