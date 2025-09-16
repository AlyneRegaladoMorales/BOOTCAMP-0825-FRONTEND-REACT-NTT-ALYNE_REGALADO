import styled from "styled-components";
import { Theme } from "../../utils/Theme";

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px;
  background-color: #1a1a1a;
  color: ${Theme.white};
  text-align: center;
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;

  a {
    color:${Theme.white};
    transition: color 0.3s;

    &:hover {
      color: #0077b5;
    }
  }

  @media (max-width: 600px) {
    gap: 15px;

    a {
      font-size: 22px;
    }
  }
`;
