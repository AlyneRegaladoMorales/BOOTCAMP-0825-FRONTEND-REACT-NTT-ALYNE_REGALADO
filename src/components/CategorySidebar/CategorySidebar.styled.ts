import styled from "styled-components";
import { Theme } from "../../utils/Theme";

export const Sidebar = styled.aside`
  width: 220px;
  border-right: 1px solid ${Theme.gray};
  padding: 16px;
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${Theme.gray};
    padding: 8px 0;
  }
`;

export const List = styled.ul<{ $mobile?: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  @media (max-width: 768px) {
    display: ${({ $mobile }) => ($mobile ? "block" : "none")};
    background: ${Theme.white};
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    margin-top: 8px;
    padding: 8px;
  }
`;

export const Item = styled.li<{ active: boolean }>`
  padding: 10px 0;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ active }) => (active ? Theme.primary : "#333")};
  font-weight: ${({ active }) => (active ? "600" : "400")};

  &:hover {
    color:${Theme.primary};
  }
  @media (max-width: 768px) {
    padding: 8px;
    border-radius: 4px;

    &:hover {
      background: ${Theme.gray};
    }
  }
`;

export const Arrow = styled.span`
  font-size: 14px;
`;

export const ToggleButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${Theme.gray};
    border-radius: 6px;
    font-size: 16px;

    &:hover {
      background: ${Theme.gray};
    }
  }
`;
