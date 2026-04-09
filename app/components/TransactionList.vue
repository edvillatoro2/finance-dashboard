<template>
  <div class="w-full flex flex-col gap-2">
    <TransitionGroup name="list" tag="ul" class="space-y-2">
      <TransactionItem
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @delete="emit('delete', $event)"
      />
    </TransitionGroup>
    <div
      v-if="!transactions?.length"
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
