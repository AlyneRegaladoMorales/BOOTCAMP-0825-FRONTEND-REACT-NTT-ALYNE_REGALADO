import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { useCart } from "../../../context/CartContext";
import { AppActions } from "../../../model/CartActions";
import { mockProducts } from "../../../pages/Home/moks/mockProducts";
import { CartItemMock, CartStateMock } from "../../../context/mocks/CartItemMock";

jest.mock("../../../context/CartContext", () => ({
  useCart: jest.fn(),
}));

const mockDispatch = jest.fn();

const setup = (customProduct = mockProducts[0], items = CartStateMock.items) => {
  (useCart as jest.Mock).mockReturnValue({
    state: { items },
    dispatch: mockDispatch,
  });

  return render(<ProductCard product={customProduct} />);
};

describe("Pruebas unitarias: ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza la información del producto", () => {
    setup(mockProducts[0], []);
    expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument();
    expect(screen.getByText(/Categoria:/i)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProducts[0].price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProducts[0].title)).toBeInTheDocument();
  });

  it("muestra el descuento si existe", () => {
    setup(mockProducts[1], []);
    expect(screen.getByText(/-18%/i)).toBeInTheDocument();
  });

  it("no muestra descuento si es 0%", () => {
    setup({ ...mockProducts[2], discountPercentage: 0 }, []);
    expect(screen.queryByText(/-%/i)).not.toBeInTheDocument();
  });

  it("agrega producto al carrito cuando hay stock", async () => {
    setup(mockProducts[3], []);
    fireEvent.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.AddItem,
      payload: mockProducts[3],
    });

    await waitFor(() =>
      expect(screen.getByText(/Se agregó con éxito!/i)).toBeInTheDocument()
    );
  });

  it("muestra error cuando no hay stock suficiente", async () => {
    setup(CartItemMock.withLowStock.product, [CartItemMock.withLowStock]);

    fireEvent.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(mockDispatch).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(screen.getByText(/Se acabó el producto/i)).toBeInTheDocument()
    );
  });

  it("muestra error cuando ya alcanzó el stock máximo", async () => {
    const productWithLimitedStock = { ...mockProducts[0], stock: 2 };
    const items = [{ product: productWithLimitedStock, quantity: 2 }];

    setup(productWithLimitedStock, items);

    fireEvent.click(screen.getByRole("button", { name: /agregar al carrito/i }));

    expect(mockDispatch).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(screen.getByText(/Se acabó el producto/i)).toBeInTheDocument()
    );
  });
});
