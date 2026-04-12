import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      status: 400,
      message: "Email and password are required",
    });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw createError({ status: 400, message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw createError({ status: 400, message: "Invalid credentials" });
  }

  await setUserSession(event, { user: { id: user.id, email: user.email } });
  return { id: user.id, email: user.email };
});
