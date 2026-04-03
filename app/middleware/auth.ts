export default defineNuxtRouteMiddleware((to, from) => {
  // simulate user authentication state (replace with real auth logic in production)
  const isLoggedIn = useState("auth");
  console.log("auth:", isLoggedIn.value);
  if (!isLoggedIn.value) {
    return navigateTo("/");
  }
});
