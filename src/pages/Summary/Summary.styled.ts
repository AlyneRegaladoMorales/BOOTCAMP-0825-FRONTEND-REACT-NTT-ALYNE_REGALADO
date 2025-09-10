import styled from "styled-components";

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
  background: #fff;
  padding: 2rem;
  border: 1px solid #eee;
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

  img {
    border-radius: 8px;
  }
`;




export const TotalBox = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  text-align: right;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: 500;
    margin-bottom: 0.3rem;
  }

  p {
    color: red;
    font-size: 0.85rem;
    margin: 0;
  }
`;
export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: 0.3s;
  &:focus {
    border-color: #e63946;
    outline: none;
    box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2);
  }
`;

export const Button = styled.button`
  padding: 1rem;
  background: #e63946;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: 0.3s;

  &:hover {
    background: #d62828;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
