export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      currency: (value: number) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
        return value < 0 ? `-${formatted}` : formatted;
      },
    },
  };
});
