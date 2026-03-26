<template>
  <div>
    <h1>Finance Dashboard</h1>
    <h1>Welcome today is, {{ today }}</h1>
    <StatCard title="Income" :value="5000" />
    <StatCard title="Expenses" :value="2000" />
    <StatCard title="Balance" :value="3000" />
    <StatCard title="Savings" />
    <section>transactions go here</section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StatCard from "@/components/StatCard.vue";
const today = ref(new Date().toDateString());
</script>

<style scoped></style>
