import styled from "styled-components";
import { Theme } from "../../utils/Theme";

export const Card = styled.div`
  width: 280px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: ${Theme.white};
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const Discount = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${Theme.primary};
  color: ${Theme.white};
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 6px;
`;

export const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: contain;
  background: ${Theme.offwhite};
`;

export const Info = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px 0;
  min-height: 40px;
`;

export const Price = styled.div`
  font-size: 16px;
  margin: 8px 0;
  span.old {
    text-decoration: line-through;
    color: #888;
    margin-left: 8px;
  }
  span.new {
    color: ${Theme.primary};
    font-weight: 600;
  }
`;
