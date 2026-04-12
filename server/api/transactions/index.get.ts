export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  return prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
});
