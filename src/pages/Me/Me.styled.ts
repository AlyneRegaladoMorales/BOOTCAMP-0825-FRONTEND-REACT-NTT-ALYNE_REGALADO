import styled from "styled-components";
import { Theme } from "../../utils/Theme";

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${Theme.white};
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
    gap: 1.5rem;
  }
`;

export const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid ${Theme.gray};
  object-fit: cover;
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

