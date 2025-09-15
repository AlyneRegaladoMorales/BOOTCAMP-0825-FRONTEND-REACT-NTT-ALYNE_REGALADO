import { PaginationContainer, PageButton } from "./Pagination.styled";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext:() => void;
  onPrev:() => void;
  

}

const Pagination = ({ page, totalPages, onPageChange, onNext, onPrev }: Props) => {
const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <PaginationContainer>
      <PageButton
        onClick={onPrev}
      > 
        ‹ Anterior
      </PageButton>

      {pages.map((num) => (
        <PageButton
          key={num}
          onClick={() => onPageChange(num)} 
          $active={num === page}
        >
          {num}
        </PageButton>
      ))}

      <PageButton
        onClick={ onNext}
      >
        Siguiente ›
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;