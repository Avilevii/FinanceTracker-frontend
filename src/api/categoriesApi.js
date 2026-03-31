import { API } from "../constants";

const categories = "categories";

export const getAllCategoriesApi = async (userId) => {
  const response = await fetch(
    `${API}/${categories}/getCategoriesByUserId/${userId}`,
  );

  const result = await response.json();

  if (!response.ok) throw new Error(result.msg || "Signup failed");
  return result;
};

export const createCategoryApi = async (newCategory) => {
  const response = await fetch(`${API}/${categories}/createCategory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
  const result = await response.json();
  const { msg, createdCategory } = result;

  if (!response.ok) throw new Error(msg || "Create category failed");
  return { msg, createdCategory };
};

export const updateCategoryApi = async (id, newCategory) => {
  const response = await fetch(`${API}/${categories}/updateCategory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, categoryName: newCategory }),
  });
  const result = await response.json();
  const { msg, categoryUpdeted } = result;

  if (!response.ok) throw new Error(msg || "Update category failed");
  return { msg, categoryUpdeted };
};

export const deleteCategoryApi = async (id) => {
  const response = await fetch(`${API}/${categories}/deleteCategory/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  const { msg, idDeleted } = result;

  if (!response.ok) throw new Error(msg || "Delete category failed");
  return { msg, idDeleted };
};
