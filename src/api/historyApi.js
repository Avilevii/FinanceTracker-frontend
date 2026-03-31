import { API } from "../constants";

const history = "history";

// ALL HISTORY.
export const getAllHistoryApi = async (
  userId,
  period,
  sortCategory,
  sortTypeCategory,
  limit,
  page,
) => {
  const response = await fetch(
    `${API}/transactions/${userId}?period=${period}&sortCategory=${sortCategory}&sortTypeCategory=${sortTypeCategory}&limit=${limit}&page=${page}`,
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.msg || "history failed");
  return result;
};

//HISTORY BY MONTH.
export const getHistoryByMonthApi = async (
  userId,
  period,
  month,
  year,
  sortCategory,
  sortTypeCategory,
  limit,
  page,
) => {
  const response = await fetch(
    `${API}/transactions/${userId}?period=${period}&month=${month}&year=${year}&sortCategory=${sortCategory}&sortTypeCategory=${sortTypeCategory}&limit=${limit}&page=${page}`,
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.msg || "history failed");
  return result;
};

// HISTORY BY RANGE
export const getHistoryByRangeApi = async (
  userId,
  period,
  startDate,
  endDate,
  sortCategory,
  sortTypeCategory,
  limit,
  page,
) => {
  const response = await fetch(
    `${API}/transactions/${userId}?period=${period}&startDate=${startDate}&endDate=${endDate}&sortCategory=${sortCategory}&sortTypeCategory=${sortTypeCategory}&limit=${limit}&page=${page}`,
  );

  const result = await response.json();

  if (!response.ok) throw new Error(result.msg || "history failed");
  return result;
};

// CREATE
export const createHistoryApi = async (newHistory) => {
  const response = await fetch(`${API}/${history}/createHistory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHistory),
  });

  const result = await response.json();
  const { msg, createdHistory } = result;

  if (!response.ok) throw new Error(msg || "create History failed");

  return { msg, createdHistory };
};

// UPDATE
export const updateHistoryApi = async (id, newHistory) => {
  const response = await fetch(`${API}/${history}/updateHistory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHistory),
  });

  const result = await response.json();
  const { msg, updatedHistory } = result;

  if (!response.ok) throw new Error(msg || "Update history failed");

  return { msg, updatedHistory };
};

export const delteHistoryApi = async (id) => {
  const response = await fetch(`${API}/${history}/deleteHistory/${id}`);

  const result = await response.json();
  const { msg } = result;

  if (!response.ok) throw new Error(msg || "Delete history failed");
  return msg;
};
