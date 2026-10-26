export async function getCachedYear() {
  "use cache";
  return new Date().getFullYear();
}
