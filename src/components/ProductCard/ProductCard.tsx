import { useCart } from "../../context/CartContext";
import { Button } from "../../layout/styles/GlobalStyle";
import type { Product } from "../../model/Products";
import { Card, Discount, Img, Info, Price, Stars, Title } from "./ProductCard.styled";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { dispatch } = useCart();

  

  return (
    <Card>
      {product.discountPercentage > 0 && (
        <Discount>-{Math.round(product.discountPercentage)}%</Discount>
      )}
      <Img src={product.thumbnail} alt={product.title} />
      <Info>
        <Title>{product.title}</Title>
        <Price>
          <span className="new">${product.price}</span>
        </Price>
        <Stars>{"★".repeat(4)}☆ ({product.rating})
        </Stars>
        <Button variant="black" onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
          Add To Cart
        </Button>
      </Info>
    </Card>
  );
};

export default ProductCard;