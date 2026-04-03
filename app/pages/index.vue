<template>
  <div>
    <section>
      <h1>Finance Dashboard</h1>
      <h1>Welcome today is, {{ today }}</h1>
      <button @click="login" class="bg-green-500 text-white px-4 py-2 rounded">
        Login
      </button>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>

      <NuxtLink to="/transactions" class="block mt-4 text-blue-500">
        Go to Transactions
      </NuxtLink>
      <div>
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/transactions">Transactions</NuxtLink>
      </div>
    </section>
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

const auth = useState("auth", () => false);
const today = ref(new Date().toDateString());
const { transactions } = useTransactions();
console.log("auth state:", auth.value);

const login = () => {
  auth.value = true;
  navigateTo("/transactions");
};
const logout = () => {
  auth.value = false;
};
const deleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter((t) => t.id !== id);
};
</script>

<style scoped></style>
