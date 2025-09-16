import styled from "styled-components";
import { Theme } from "../../utils/Theme";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Theme.gray};
`;

export const LoginBox = styled.div`
  background: ${Theme.white};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: ${Theme.black};
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
    color: ${Theme.darkgray};
  }
`;

export const ForgotLink = styled.a`
  display: block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${Theme.primary};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
