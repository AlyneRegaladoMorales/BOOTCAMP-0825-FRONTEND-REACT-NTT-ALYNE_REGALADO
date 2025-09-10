import { PaginationContainer, PageButton } from "./Pagination.styled";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ‹ Anterior
      </PageButton>

      <span>
        Página {page} de {totalPages}
      </span>

      <PageButton
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente ›
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;