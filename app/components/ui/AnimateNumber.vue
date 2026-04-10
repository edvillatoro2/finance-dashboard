<template>
  <div>
    <span>{{ formattedValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";

const props = defineProps<{
  value: number;
  duration?: number;
}>();

const { $currency } = useNuxtApp();
const displayValue = ref(0);
const duration = props.duration ?? 900;

watch(
  () => props.value,
  (newValue) => {
    // only run in browser
    if (typeof window === "undefined") {
      displayValue.value = newValue;
      return;
    }

    const start = displayValue.value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      displayValue.value = Math.floor(
        start + (newValue - start) * easeOutCubic(progress),
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        displayValue.value = newValue;
      }
    };

    requestAnimationFrame(animate);
  },
  { immediate: true },
);

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const formattedValue = computed(() => $currency(displayValue.value));
</script>

<style scoped></style>
