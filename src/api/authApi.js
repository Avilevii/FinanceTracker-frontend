import { API } from "./getBalanceApi.js";

const auth = "auth";

export const postSignUpFetch = async (userName, password) => {
  const response = await fetch(`${API}/${auth}/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  });

  const result = await response.json();
  const { msg, userId } = result;
  if (!response.ok) throw new Error(msg || "Signup failed");
  return { msg, userId };
};

export const postLoginFetch = async (userName, password) => {
  const response = await fetch(`${API}/${auth}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  });

  const result = await response.json();
  const { msg, userId } = result;
  if (!response.ok) throw new Error(msg || "Login failed");
  return { msg, userId };
};
