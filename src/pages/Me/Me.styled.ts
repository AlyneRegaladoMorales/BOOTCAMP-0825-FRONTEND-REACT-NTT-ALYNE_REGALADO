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

export const InfoSection = styled.div`

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    justify-content: end;
  }

  p {
    margin: 1rem 1rem;
    font-size: 1rem;
    color: #444;
  }

  strong {
    color: #222;
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

export const Badge = styled.span`
  display: inline-block;
  background: ${Theme.primary}; 
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
