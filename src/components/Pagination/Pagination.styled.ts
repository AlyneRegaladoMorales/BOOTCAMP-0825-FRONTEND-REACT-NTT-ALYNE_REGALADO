import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  gap: 12px;
  
  span {
    font-weight: 500;
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  background: ${({ $active }) => ($active ? "#e63946" : "#f9f9f9")};
  color: ${({ $active }) => ($active ? "white" : "#333")};

  &:hover {
    background: ${({ $active }) => ($active ? "#e63946" : "#eee")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
