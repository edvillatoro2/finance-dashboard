import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw createError({ statusCode: 400, message: "Email is already in use" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name: name },
  });

  await setUserSession(event, {
    user: { id: user.id, email: user.email, name: user.name },
  });
  return { id: user.id, email: user.email, name: user.name };
});
