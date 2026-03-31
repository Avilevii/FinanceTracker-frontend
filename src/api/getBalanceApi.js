import { API } from "../constants";

export const getBalanceApi = async (id) => {
  const response = await fetch(`${API}/balance/getBalance/${id}`);
  const result = await response.json();
  const { msg, balance } = result;

  if (!response.ok) throw new Error(msg || "Failed to fetch balance");
  return balance;
};
