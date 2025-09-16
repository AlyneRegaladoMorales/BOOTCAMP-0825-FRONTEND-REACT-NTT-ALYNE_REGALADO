import type { Category, CategoryResponse } from "../model/Category";

export const getCategoriesMapper = (categories: CategoryResponse[]): Category[] => {
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    url: category.url,
  }));
};
