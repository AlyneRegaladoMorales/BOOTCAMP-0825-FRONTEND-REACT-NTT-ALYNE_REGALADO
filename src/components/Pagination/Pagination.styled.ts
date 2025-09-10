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

export const PageButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  color: #333;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #eee;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
