import styled from "styled-components";
import { Theme } from "../../utils/Theme";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.div`
  background: ${Theme.white};
  padding: 2rem;
  border: 1px solid ${Theme.gray};
  border-radius: 12px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;

  th,
  td {
    border: 1px solid ${Theme.gray};
    padding: 0.8rem;
    text-align: left;
  }

  th {
    background: ${Theme.gray};
    font-weight: 600;
  }

  td {
    vertical-align: middle;
  }

  img {
    border-radius: 8px;
  }

  button {
    background: transparent;
    border: 1px solid #ccc;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: #f1f1f1;
    }
  }
`;

export const TotalBox = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  text-align: right;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${Theme.disabled};
  background: ${Theme.white};
  transition: 0.3s;
  font-size: 1rem;

  &:focus {
    border-color: ${Theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2);
  }

  option {
    padding: 0.5rem;
  }
`;
export const QuantityBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  span.error {
    color: ${Theme.primary};
    font-size: 0.9rem;
    margin-top: 0.3rem;
  }
`;
