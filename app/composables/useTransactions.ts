export const useTransactions = () => {
  const transactions = useState<any[]>("transactions", () => []);

  const fetchTransactions = async () => {
    const { data } = await useFetch("/api/transactions");
    transactions.value = data.value || [];
  };

  const addTransaction = async (payload: { text: string; amount: number }) => {
    const newTransaction = await $fetch("/api/transactions", {
      method: "POST",
      body: payload,
    });
    // update local state
    transactions.value.push(newTransaction);
  };

  const deleteTransaction = async (id: number) => {
    transactions.value = transactions.value.filter((t) => t.id !== id);
  };
  return {
    transactions,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  };
};
