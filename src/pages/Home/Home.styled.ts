import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const Container = styled.div`
  display: flex;
  width: 80vw;
  align-content: center;
   @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column; 
    width: 100%;
    padding: 0 1rem;
    gap: 1rem;
  }
`;
export const Content = styled.div`
  flex: 1;
  padding: 2rem;
   @media (max-width: 768px) {
    padding: 1rem 0;
  }
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  place-items: center;
  
`;
