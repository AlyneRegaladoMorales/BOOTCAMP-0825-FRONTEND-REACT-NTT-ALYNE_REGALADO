import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Badge, Button, InfoSection } from "../../utils/GlobalStyle";
import type { Product } from "../../model/Products";
import { Card, Discount, Img, Price } from "./ProductCard.styled";
import Toast from "../Toast/Toast";
import Stars from "../Stars/stars";
import { AppActions } from "../../model/CartActions";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { state, dispatch } = useCart();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const MIN_DISCOUNT = 0; 
  const TOAST_DURATION_ERROR = 1500;   
  const TOAST_DURATION_SUCCESS = 1000;

  const handleAddToCart = () => {
    const existing = state.items.find((i) => i.product.id === product.id);
    if (existing && existing.quantity >= product.stock) {
      setToast({ message: "Se acabó el producto", type: "error" });
      setTimeout(() => setToast(null), TOAST_DURATION_ERROR);
      return;
    }

    dispatch({ type: AppActions.AddItem, payload: product });
    setToast({ message: "Se agregó con éxito!", type: "success" });
    setTimeout(() => setToast(null), TOAST_DURATION_SUCCESS);
  };

  return (
    <>
      <Card>
        {product.discountPercentage > MIN_DISCOUNT && (
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
            Agregar al carrito
          </Button>
          {toast && <Toast message={toast.message} type={toast.type} />}

        </InfoSection>
      </Card>
    </>

  );
};

export default ProductCard;