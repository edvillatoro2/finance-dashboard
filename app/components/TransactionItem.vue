<template>
  <div>
    <ul>
      <li
        class="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
      >
        <div class="flex flex-col">
          <span class="font-medium">{{ transaction.text }}</span>
          <span
            :class="transaction.amount < 0 ? 'text-red-500' : 'text-green-500'"
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
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Transaction } from "@/types/transaction";

defineProps<{
  transaction: Transaction;
}>();

const emit = defineEmits(["delete"]);
const { $currency } = useNuxtApp();
</script>

<style scoped></style>
