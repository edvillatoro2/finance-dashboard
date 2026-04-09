export type Transaction = {
  id: number;
  text: string;
  amount: number;
  createdAt?: string;
  category?: "income" | "expense";
};
