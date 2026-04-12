export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const id = Number(getRouterParam(event, "id"));

  const transaction = await prisma.transaction.findUnique({ where: { id } });

  if (!transaction || transaction.userId !== user.id) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  return prisma.transaction.delete({ where: { id } });
});
