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
