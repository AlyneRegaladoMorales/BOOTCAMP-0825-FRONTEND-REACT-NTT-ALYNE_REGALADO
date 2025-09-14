import type { Category, CategoryResponse } from "../model/Category";

export const getCategoriesMapper = (category: CategoryResponse[]): Category[] => {
  return category.map((c) => ({
    slug: c.slug,
    name: c.name,
    url: c.url,
  }));
};
