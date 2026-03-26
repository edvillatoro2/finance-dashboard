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
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          {{ transaction.text }} - {{ transaction.amount }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StatCard from "@/components/StatCard.vue";
import { useTransactions } from "@/composables/useTransactions";

const today = ref(new Date().toDateString());
const { transactions, income, expenses, balance } = useTransactions();
</script>

<style scoped></style>
