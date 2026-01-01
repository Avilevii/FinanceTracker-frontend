import { API } from "./getBalanceApi";

const categories = "categories";

export const getAllCategoriesFetch = async (userId) => {
  const response = await fetch(
    `${API}/${categories}/getCategoriesByUserId/${userId}`
  );

  const result = await response.json();
  const { msg, data } = result;
  if (!response.ok) throw new Error(msg || "Signup failed");
  return data;
};

export const createCategoryFetch = async (newCategory) => {
  const response = await fetch(`${API}/${categories}/createCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
  const result = await response.json();
  const { msg, cretedCategory } = result;
  if (!response.ok) throw new Error(msg || "Signup failed");
  return {msg, cretedCategory };
};

export const updateCategoryFetch = async (id, newCategory) => {
  const response = await fetch(`${API}/${categories}/updateCategory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
  const result = await response.json();
  const { msg, categoryUpdeted } = result;
  if (!response.ok) throw new Error(msg || "Update category failed");
  return {msg, categoryUpdeted };
};

export const deleteCategoryFetch = async (id) => {
  const response = await fetch(`${API}/${categories}/deleteCategory/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  const { msg, idDelted } = result;
  if (!response.ok) throw new Error(msg || "Delete category failed");
  return { msg, idDelted };
};
