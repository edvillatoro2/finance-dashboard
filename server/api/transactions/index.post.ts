export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { text, amount } = await readBody(event);

  return prisma.transaction.create({
    data: { text, amount, userId: user.id },
  });
});
