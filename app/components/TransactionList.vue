<template>
  <div class="w-full flex flex-col gap-4">
    <div
      v-if="!transactions.length"
      class="text-white/50 text-sm text-center py-4"
    >
      No transactions yet
    </div>
    <div
      v-for="(group, date) in groupedTransactions"
      :key="date"
      class="border border-gray-200 rounded-lg p-4 bg-white/10 backdrop-blur-sm shadow-sm"
    >
      <!-- date header -->
      <p
        class="text-sm text-white font-bold capitalize text-right tracking-wide mb-2 px-1"
      >
        {{ date }}
      </p>
      <ul class="flex flex-col gap-2 mb-14">
        <TransactionItem
          v-for="transaction in group"
          :key="transaction.id"
          :transaction="transaction"
          @delete="emit('delete', $event)"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import TransactionItem from "@/components/TransactionItem.vue";
import type { Transaction } from "@/types/transaction";

const props = defineProps<{
  transactions: Transaction[];
}>();

const emit = defineEmits(["delete"]);

const groupedTransactions = computed(() => {
  const sorted = [...props.transactions].sort(
    (a, b) =>
      new Date(a.createdAt ?? 0).getTime() -
      new Date(b.createdAt ?? 0).getTime(),
  );

  return sorted.reduce((groups, transaction) => {
    const date = transaction.createdAt
      ? new Date(transaction.createdAt).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
      : "No Date";
    if (!groups[date]) groups[date] = [];
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);
});
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
