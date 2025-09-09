import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, page, itemsPerPage]);

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const goToPage = (n: number) => {
    if (n >= 1 && n <= totalPages) setPage(n);
  };

  return {
    page,
    totalPages,
    pageItems,
    setPage: goToPage,
    nextPage,
    prevPage,
  };
}
