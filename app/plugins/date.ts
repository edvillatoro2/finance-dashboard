export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      formatDate: (date: string | number) => {
        return new Date(date).toLocaleDateString();
      },
    },
  };
});
