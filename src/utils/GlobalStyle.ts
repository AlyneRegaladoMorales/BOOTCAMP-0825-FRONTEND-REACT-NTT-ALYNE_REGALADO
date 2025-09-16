import styled from "styled-components";
import { Theme } from "./Theme";



interface ButtonProps {
  variant?: "red" | "black";
}

export const MainContent = styled.main`
  display: flex;
  margin-top: 17vh;
  justify-content: center;
  flex-direction: column;
  min-height: 75vh;
`;
export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${Theme.disabled};
  border-radius: 8px;
  font-size: 0.95rem;
  transition: 0.3s;

  &:focus {
    border-color: ${Theme.primary};
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
  color:${Theme.white};
  transition: 0.3s;

  background: ${({ variant }) =>
    variant === "black" ? Theme.black : Theme.primary};

  &:hover {
    background: ${({ variant }) =>
      variant === "black"
        ? Theme.blackHover
        : Theme.primaryHover};
  }

  &:disabled {
    background: ${Theme.disabled};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: ${Theme.primary};
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Badge = styled.span`
  display: inline-block;
  background: ${Theme.primaryHover}; 
  color: ${Theme.white};
  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  margin-left: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  flex: 1;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    justify-content: end;
  }
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 6px 0;
    min-height: 40px;
  }
    
  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

