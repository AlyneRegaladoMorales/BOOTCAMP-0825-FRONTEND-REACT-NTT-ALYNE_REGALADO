import type { Category } from "../model/Category";

export const getCategoriesMapper = (category: any[]): Category[] => {
  return category.map((c) => ({
    slug: c.slug,
    name: c.name,
    url: c.url,
  }));
};
