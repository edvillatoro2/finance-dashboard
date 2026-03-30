export default defineEventHandler((event) => {
  const id = event.context.params?.id;

  const transactions = [
    { id: 1, text: "Salary", amount: 3000 },
    { id: 2, text: "Food", amount: -100 },
  ];
  return transactions.find((t) => t.id === Number(id));
});
