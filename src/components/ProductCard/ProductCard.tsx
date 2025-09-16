import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Badge, Button, InfoSection } from "../../utils/GlobalStyle";
import type { Product } from "../../model/Products";
import { Card, Discount, Img, Price } from "./ProductCard.styled";
import Toast from "../Toast/Toast";
import Stars from "../Stars/stars";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { state, dispatch } = useCart();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);


  const handleAddToCart = () => {
    const existing = state.items.find((i) => i.product.id === product.id);
    if (existing && existing.quantity >= product.stock) {
      setToast({ message: "Se acabó el producto", type: "error" });
      setTimeout(() => setToast(null), 1500);
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: product });
    setToast({ message: "Se agregó con éxito!", type: "success" });
    setTimeout(() => setToast(null), 1000);
  };



  return (
    <>
      <Card>
        {product.discountPercentage > 0 && (
          <Discount>-{Math.round(product.discountPercentage)}%</Discount>
        )}
        <Img src={product.thumbnail} alt={product.title} />
        <InfoSection>
          <h3>{product.title}</h3>
          <p>Categoria: <Badge>{product.category}</Badge> </p>
          

          <Price>
            <span className="new">${product.price}</span>
          </Price>
          <Stars rating={product.rating} />

          <Button variant="black" onClick={handleAddToCart}>
            Add To Cart
          </Button>
          {toast && <Toast message={toast.message} type={toast.type} />}

        </InfoSection>
      </Card>



    </>

  );
};

export default ProductCard;