import styled from "styled-components";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9f9f9; 
`;

export const LoginBox = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #111;
  font-size: 1.8rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1.2rem;

  label {
    margin-bottom: 0.3rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: #333;
  }

  input {
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: 0.3s;

    &:focus {
      border-color: #e63946;
      outline: none;
      box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2);
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: #e63946;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #d62828;
  }
`;

export const ForgotLink = styled.a`
  display: block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #e63946;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
