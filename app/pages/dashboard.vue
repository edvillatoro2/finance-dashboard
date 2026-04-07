<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-20 bg-white shadow flex flex-col items-center py-6 gap-6">
      <div class="w-10 h-10 bg-black rounded-xl"></div>
      <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
      <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
      <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Dashboard</h1>

        <div class="flex gap-8">
          <div>
            <p class="text-xl font-bold">12K+</p>
            <p class="text-sm text-gray-500">EOI Submitted</p>
          </div>
          <div>
            <p class="text-xl font-bold">81%</p>
            <p class="text-sm text-gray-500">Approval Rate</p>
          </div>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card 1 -->
        <Card title="Overview">
          <div class="text-3xl font-bold mb-4">{{ $currency(total) }}</div>
          <div>
            <p class="text-xl font-bold">{{ transactions.length }}</p>
            <p class="text-sm text-gray-500">Transactions</p>
          </div>
        </Card>
        <!-- Card 2 -->
        <Card title="map preview">
          <div class="h-40 bg-gray-100 rounded-xl"></div>
        </Card>

        <!-- Card 3 -->
        <Card title="details">
          <div class="flex justify-between">
            <div>
              <p class="font-bold">27.8K</p>
              <p class="text-gray-500 text-sm">Requests</p>
            </div>
            <div>
              <p class="font-bold">67%</p>
              <p class="text-gray-500 text-sm">Engaged</p>
            </div>
            <div>
              <p class="font-bold">24%</p>
              <p class="text-gray-500 text-sm">Sent</p>
            </div>
          </div>
        </Card>

        <!-- Card 4 -->
        <Card title="trends">
          <div class="h-40 bg-gray-100 rounded-xl"></div>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "@/components/ui/Card.vue";
import { useTransactions } from "@/composables/useTransactions";

definePageMeta({
  middleware: "auth",
});

const { transactions } = useTransactions();
const { $currency } = useNuxtApp();

const total = computed(() => {
  return transactions.value.reduce((sum, t) => sum + t.amount, 0);
});
</script>

<style scoped></style>
