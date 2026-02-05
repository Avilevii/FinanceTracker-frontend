import { API } from "../constance";

const history = "history";

// ALL HISTORY.
export const getAllHistoryFetch = async (userId, period, sortCategory, sortTypeCategory) => {
  const response = await fetch(
    `${API}/transactions/${userId}?period=${period}&sortCategory=${sortCategory}&sortTypeCategory=${sortTypeCategory}`
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.msg || "history failed");
  return result;
};

//HISTORY BY MONTH.
export const getHistoryByMonthFetch = async (userId, period, month, year,  sortCategory, sortTypeCategory) => {
  console.log("month", sortCategory, sortTypeCategory)
  const response = await fetch(
    `${API}/transactions/${userId}?period=${period}&month=${month}&year=${year}&sortCategory=${sortCategory}&sortTypeCategory=${sortTypeCategory}`);

  const result = await response.json();
  if (!response.ok) throw new Error(result.msg || "history failed");
  return result;
};

// HISTORY BY RANGE
export const getHistoryByRangeFetch = async (userId, period, startDate, endDate, sortCategory, sortTypeCategory) => {
  const response = await fetch(
    `${API}/transactions/${userId}?period=${period}&startDate=${startDate}&endDate=${endDate}&sortCategory=${sortCategory}&sortTypeCategory=${sortTypeCategory}`);
    console.log("AVI", sortCategory, sortTypeCategory)
  
    const result = await response.json();
    
    if (!response.ok) throw new Error(result.msg || "history failed");
  return result;
};

// CREATE
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
  const { msg, createdHistory } = result;
  if (!response.ok) throw new Error(msg || "createHistory failed");
  return {msg, createdHistory };
};

// UPDATE
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
  const { msg , updatedHistory } = result;
  if (!response.ok) throw new Error(msg || "createHistory failed");
  return {msg, updatedHistory};
};

export const delteHistoryFetch = async (id) => {
  const response = await fetch(
    `${API}/${history}/deleteHistory/${id}`);

  const result = await response.json();
  const { msg } = result;
  if (!response.ok) throw new Error(msg || "createHistory failed");
  return msg;
};
