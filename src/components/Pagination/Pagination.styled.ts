import styled from "styled-components";
import { Theme } from "../../utils/Theme";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  gap: 12px;
  flex-wrap: wrap;

  span {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    font-size: 14px;
  }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${Theme.gray};
  border-radius: 4px;
  cursor: pointer;

  background: ${({ $active }) => ($active ? Theme.primary :  Theme.offwhite)};
  color: ${({ $active }) => ($active ? Theme.white : Theme.darkgray)};

  &:hover {
    background: ${({ $active }) => ($active ? Theme.primary :  Theme.offwhite)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 12px;
  }
`;
