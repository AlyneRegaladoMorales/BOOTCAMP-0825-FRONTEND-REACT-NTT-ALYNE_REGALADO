import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
top: 0;   
  left: 0;
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
  width: 25vw;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const PrimaryButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    width: 2rem;
    height: 2rem;
    border: none;
    background: gray;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
  }
`;
