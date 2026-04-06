<template>
  <div>
    <ul class="space-y-2 w-full max-w-md">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex justify-between items-center"
      >
        <div class="flex flex-col">
          <span class="font-medium">{{ transaction.text }}</span>
          <span
            :class="transaction.amount < 0 ? 'text-red-500' : 'text-green-500'"
          >
            {{ $currency(transaction.amount) }}
          </span>
        </div>

        <button
          @click="emit('delete', transaction.id)"
          class="text-red-500 hover:underline"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  transactions: {
    id: number;
    text: string;
    amount: number;
  }[];
}>();

const { $currency } = useNuxtApp();

const emit = defineEmits(["delete"]);
</script>

<style scoped></style>
