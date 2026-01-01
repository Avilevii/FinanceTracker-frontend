export const API = " http://localhost:3000";

export const getBalance = async (id) => {
  const response = await fetch(`${API}/balance/getBalance/${id}`);
  const result = await response.json();
  const {msg, balance} = result;
  if (!response.ok) throw new Error( msg ||"Failed to fetch balance");
  return balance;
}

