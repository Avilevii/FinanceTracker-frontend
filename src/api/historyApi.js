import { API } from "../constance";

const history = "history";

export const getAllHistoryFetch = async (userId) => {
  const response = await fetch(
    `${API}/${history}/getHIstoryByUserId/${userId}`
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.msg || "history failed");
  return result;
};

export const getHistoryByMonthFetch = async (userId, period, month, year) => {
  const response = await fetch(
    `${API}/${history}/getHIstoryByUserId/${userId}?period=${period}&month=${month}&year=${year}`);

  const result = await response.json();
  const { msg, data } = result;
  if (!response.ok) throw new Error(msg || "history failed");
  return data;
};

export const createHistoryFetch = async (newHistory) => {
  const response = await fetch(
    `${API}/${history}/createHistory`, {
        method: 'POST',
        headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHistory),
    });

  const result = await response.json();
  const { msg } = result;
  if (!response.ok) throw new Error(msg || "createHistory failed");
  return msg;
};

export const updateHistoryFetch = async (id, newHistory) => {
  const response = await fetch(
    `${API}/${history}/updateHistory/${id}`, {
        method: 'PUT',
        headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHistory),
    });

  const result = await response.json();
  const { msg , history } = result;
  if (!response.ok) throw new Error(msg || "createHistory failed");
  return {msg, history};
};

export const delteHistoryFetch = async (id) => {
  const response = await fetch(
    `${API}/${history}/deleteHistory/${id}`);

  const result = await response.json();
  const { msg } = result;
  if (!response.ok) throw new Error(msg || "createHistory failed");
  return msg;
};
