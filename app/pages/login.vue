<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-200 to-blue-500 flex items-center justify-center p-6"
  >
    <div
      class="w-full max-w-md rounded-3xl p-8 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
    >
      <h1 class="text-2xl font-bold text-white mb-2">
        {{ isLogin ? "Welcome back" : "Create account" }}
      </h1>
      <p class="text-white/60 text-sm mb-8">
        {{
          isLogin ? "Sign in to your account" : "Start tracking your finances"
        }}
      </p>

      <div class="flex flex-col gap-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
        />

        <p v-if="error" class="text-red-300 text-sm">{{ error }}</p>

        <button
          @click="submit"
          :disabled="loading"
          class="w-full py-3 rounded-xl bg-white/30 text-white font-semibold hover:bg-white/40 transition disabled:opacity-50"
        >
          {{ loading ? "Please wait..." : isLogin ? "Sign in" : "Register" }}
        </button>

        <p class="text-center text-white/60 text-sm">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button @click="isLogin = !isLogin" class="text-white underline ml-1">
            {{ isLogin ? "Register" : "Sign in" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
definePageMeta({ auth: false });

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const isLogin = ref(true);

const { fetch: refreshSession } = useUserSession();

const submit = async () => {
  error.value = "";
  loading.value = true;

  try {
    const endpoint = isLogin.value ? "api/auth/login" : "api/auth/register";
    await $fetch(endpoint, {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    await refreshSession();
    navigateTo("/");
  } catch (err: any) {
    error.value = err?.data?.message ?? "something went wront";
  } finally {
    loading.value = false;
  }
};
</script>
