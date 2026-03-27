<template>
  <div>
    <h1>Finance Dashboard</h1>
    <h1>Welcome today is, {{ today }}</h1>
    <section>
      <StatCard title="Income" :value="5000" />
      <StatCard title="Expenses" :value="2000" />
      <StatCard title="Balance" :value="3000" />
      <StatCard title="Savings" :value="150" />
    </section>
    <section>
      <h2>Recent Transactions</h2>
      <TransactionList
        :transactions="transactions"
        @delete="deleteTransaction"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StatCard from "@/components/StatCard.vue";
import { useTransactions } from "@/composables/useTransactions";
import TransactionList from "@/components/TransactionList.vue";

const today = ref(new Date().toDateString());
const { transactions } = useTransactions();

const deleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter((t) => t.id !== id);
};
</script>

<style scoped></style>
