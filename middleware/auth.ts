export default defineNuxtRouteMiddleware((to, from) => {
  // simulate user authentication state (replace with real auth logic in production)
  const isLoggedIn = userState("auth");
  if (!isLoggedIn.value) {
    return navigateTo("/");
  }
});
