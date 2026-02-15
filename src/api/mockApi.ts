export async function getTransactions() {
  // Simulate network delay
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  await delay(400 + Math.random() * 400);

  // 10% chance of failure
  if (Math.random() < 0.1) {
    throw new Error("Failed to load transactions.");
  }

  const response = await fetch("/transactions.json");
  return response.json();
}