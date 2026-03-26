export function useTransactions() {
  const transactions = ref([
    {
      id: 1,
      text: "Salary",
      amount: 3000,
    },
    {
      id: 2,
      text: "Groceries",
      amount: -50,
    },
  ]);

  return {
    transactions,
  };
}
