import styled, { keyframes } from "styled-components";
import { Theme } from "../../utils/Theme";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ToastBox = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 250px;
  padding: 12px 16px;
  border-radius: 5px;
  color: ${Theme.white};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${fadeIn} 0.1s ease;

  ${({ type }) =>
    type === "success" &&
    `background: ${Theme.success}`}
  ${({ type }) =>
  type === "error" && `background: ${Theme.primary}`}

`;

export interface Props {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

