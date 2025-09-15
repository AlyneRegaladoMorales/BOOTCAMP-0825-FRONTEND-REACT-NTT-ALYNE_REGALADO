import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Button } from "../../layout/styles/GlobalStyle";
import type { Product } from "../../model/Products";
import { Card, Discount, Img, Info, Price, Title } from "./ProductCard.styled";
import Toast from "../Toast/Toast";
import Stars from "../Stars/stars";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { dispatch } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 500);
  };



  return (
    <>
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
          <Stars rating={product.rating} />

          <Button variant="black" onClick={handleAddToCart}>
            Add To Cart
          </Button>
          {showToast && <Toast message="Se agregó con éxito!" type="success" />}

        </Info>
      </Card>



    </>

  );
};

export default ProductCard;