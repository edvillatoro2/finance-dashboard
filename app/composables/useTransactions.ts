import type { Transaction } from "@/types/transaction";

export const useTransactions = () => {
  const transactions = useState<Transaction[]>("transactions", () => []);

  const fetchTransactions = async () => {
    const data = await $fetch<Transaction[]>("/api/transactions");
    transactions.value = data;
  };

  const addTransaction = async (payload: { text: string; amount: number }) => {
    try {
      const newTransaction = await $fetch<Transaction>("/api/transactions", {
        method: "POST",
        body: payload,
      });

      console.log("NEW:", newTransaction);

      transactions.value.push(newTransaction);
    } catch (err) {
      console.error("Failed to add transaction", err);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await $fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      transactions.value = transactions.value.filter((t) => t.id !== id);
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
