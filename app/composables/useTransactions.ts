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
    {
      id: 3,
      text: "Coffee",
      amount: -5,
    },
  ]);

  const income = computed(() =>
    transactions.value
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0),
  );

  const expenses = computed(() =>
    transactions.value
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0),
  );

  const balance = computed(() => income.value + expenses.value);

  return {
    transactions,
    income,
    expenses,
    balance,
  };
}
