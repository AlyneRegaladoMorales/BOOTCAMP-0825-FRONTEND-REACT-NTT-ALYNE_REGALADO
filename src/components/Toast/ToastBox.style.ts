import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ToastBox = styled.div<{ type: "success" | "error" | "info" | "warning" }>`
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 250px;
  padding: 12px 16px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${fadeIn} 0.1s ease;

  ${({ type }) =>
    type === "success" &&
    `background: #4caf50;`} /* Verde */

`;

export interface Props {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

