import styled from "styled-components";
import type { theme } from "./theme";
type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
interface ButtonProps {
  variant?: "red" | "black";
}

export const MainContent = styled.main`
  display: flex;
  margin-top: 17vh;
`;
export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2);
  }
`;

export const Button = styled.button<ButtonProps>`
  width: 100%;
  padding: 1rem;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.white};
  transition: 0.3s;
  
  background: ${({ theme, variant }) =>
    variant === "black" ? theme.colors.black : theme.colors.primary};

  &:hover {
    background: ${({ theme, variant }) =>
      variant === "black" ? theme.colors.blackHover : theme.colors.primaryHover};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;
