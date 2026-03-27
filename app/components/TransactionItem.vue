<template>
  <div>
    <ul>
      <li>
        <span>{{ transaction.text }}</span>
        <span>{{ transaction.amount }}</span>
        <button @click="emit('delete', transaction.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  transaction: {
    id: number;
    text: string;
    amount: number;
  };
}>();

const emit = defineEmits(["delete"]);
</script>

<style scoped></style>
