<template>
  <div>
    <ul>
      <TransactionItem
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @delete="emit('delete', $event)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import TransactionItem from "./TransactionItem.vue";

defineProps<{
  transactions: any[];
}>();

const emit = defineEmits(["delete"]);
</script>

<style scoped></style>
