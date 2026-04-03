export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      currency: (value: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      },
    },
  };
});
