import styled from "styled-components";

export const Sidebar = styled.aside`
  width: 220px;
  border-right: 1px solid #e5e5e5;
  padding: 16px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li<{ active: boolean }>`
  padding: 10px 0;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ active }) => (active ? "#e63946" : "#333")};
  font-weight: ${({ active }) => (active ? "600" : "400")};

  &:hover {
    color: #e63946;
  }
`;

export const Arrow = styled.span`
  font-size: 14px;
`;