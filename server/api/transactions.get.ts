import type { Transaction } from "@/types/transaction";

export default defineEventHandler((): Transaction[] => {
  return [
    { id: 1, text: "Salary", amount: 3000 },
    { id: 2, text: "Food", amount: -100 },
  ];
});
