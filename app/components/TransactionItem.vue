<template>
  <li
    class="flex justify-between items-center p-3 border rounded hover:bg-gray-200/20 transition-colors duration-200 cursor-pointer"
  >
    <div class="flex flex-col">
      <span class="font-medium text-white">{{ transaction.text }}</span>
      <span :class="transaction.amount < 0 ? 'text-red-400' : 'text-green-400'">
        <AnimatedNumber :value="transaction.amount" />
      </span>
      <button
        @click="emit('delete', transaction.id)"
        class="mt-2 px-3 py-1.5 text-white text-sm rounded-lg bg-red-500/30 border border-red-500/80 hover:bg-red-600/40 hover:text-red-200 transition-colors duration-200"
      >
        Delete
      </button>
    </div>
  </li>
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transaction";
import AnimatedNumber from "@/components/ui/AnimateNumber.vue";

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
