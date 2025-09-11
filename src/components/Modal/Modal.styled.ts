import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 25rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const PrimaryButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #333;
  }
`;
