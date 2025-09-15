import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Container = styled.div`
  display: flex;
  width: 80vw;
  align-content: center;
`;
export const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  button {
    margin-left: 8px;
    padding: 6px 12px;
    border: none;
    background: #e63946;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 5rem;
  margin-bottom: 2rem;
`;
