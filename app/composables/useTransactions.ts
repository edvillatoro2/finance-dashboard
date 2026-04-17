import type { Transaction } from "@/types/transaction";

export const useTransactions = () => {
  const transactions = useState<Transaction[]>("transactions", () => []);

  const fetchTransactions = async () => {
    const data = await $fetch<Transaction[]>("/api/transactions");
    transactions.value = data;
  };

  const addTransaction = async (payload: {
    text: string;
    amount: number;
    category?: string;
  }) => {
    try {
      const category = payload.amount > 0 ? "income" : "expense";
      const newTransaction = await $fetch<Transaction>("/api/transactions", {
        method: "POST",
        body: {
          text: payload.text,
          amount: payload.amount,
          category: payload.category,
        },
      });
      await fetchTransactions();
    } catch (err) {
      console.error("Failed to add transaction", err);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await $fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      await fetchTransactions();
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
  };
  return {
    transactions,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
  };
};
