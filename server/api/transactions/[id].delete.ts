export default defineEventHandler(async (event) => {
  const id = getRouterParams(event).id;
  // simulate deletion
  return { success: true, id };
});
