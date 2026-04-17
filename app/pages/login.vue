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
        <!-- Register only fields -->
        <template v-if="!isLogin">
          <div class="flex gap-3">
            <input
              v-model="firstName"
              type="text"
              placeholder="First name"
              class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
            />
            <input
              v-model="lastName"
              type="text"
              placeholder="Last name"
              class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
            />
          </div>
        </template>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50"
        />

        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50 pr-12"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-sm"
          >
            {{ showPassword ? "Hide" : "Show" }}
          </button>
        </div>

        <!-- Password requirements (register only) -->
        <template v-if="!isLogin && password.length > 0">
          <ul class="text-xs space-y-1 px-1">
            <li :class="checks.length ? 'text-green-300' : 'text-white/40'">
              {{ checks.length ? "✓" : "○" }} At least 8 characters
            </li>
            <li :class="checks.uppercase ? 'text-green-300' : 'text-white/40'">
              {{ checks.uppercase ? "✓" : "○" }} One uppercase letter
            </li>
            <li :class="checks.number ? 'text-green-300' : 'text-white/40'">
              {{ checks.number ? "✓" : "○" }} One number
            </li>
            <li :class="checks.special ? 'text-green-300' : 'text-white/40'">
              {{ checks.special ? "✓" : "○" }} One special character
            </li>
          </ul>
        </template>

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
          <button @click="toggleMode" class="text-white underline ml-1">
            {{ isLogin ? "Register" : "Sign in" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false });

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const error = ref("");
const loading = ref(false);
const isLogin = ref(true);
const showPassword = ref(false);

const checks = computed(() => ({
  length: password.value.length >= 8,
  uppercase: /[A-Z]/.test(password.value),
  number: /[0-9]/.test(password.value),
  special: /[^A-Za-z0-9]/.test(password.value),
}));

const allChecksPassed = computed(() =>
  Object.values(checks.value).every(Boolean),
);

const { fetch: refreshSession } = useUserSession();

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  error.value = "";
  password.value = "";
  email.value = "";
  firstName.value = "";
  lastName.value = "";
};

const submit = async () => {
  error.value = "";

  if (!isLogin.value) {
    if (!firstName.value.trim() || !lastName.value.trim()) {
      error.value = "First and last name are required.";
      return;
    }
    if (!allChecksPassed.value) {
      error.value = "Please meet all password requirements.";
      return;
    }
  }

  if (!email.value.includes("@")) {
    error.value = "Please enter a valid email address.";
    return;
  }

  loading.value = true;

  try {
    const endpoint = isLogin.value ? "/api/auth/login" : "/api/auth/register";
    await $fetch(endpoint, {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
        ...(!isLogin.value && {
          name: `${firstName.value.trim()} ${lastName.value.trim()}`,
        }),
      },
    });

    await refreshSession();
    navigateTo("/");
  } catch (err: any) {
    error.value = err?.data?.message ?? "Something went wrong.";
  } finally {
    loading.value = false;
  }
};
</script>
