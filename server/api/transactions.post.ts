export default defineEventHandler(async (event) => {
  // read data sent from frontend
  const body = await readBody(event);
  // for now, just return it (simulate saving)
  return { success: true, data: body };
});
