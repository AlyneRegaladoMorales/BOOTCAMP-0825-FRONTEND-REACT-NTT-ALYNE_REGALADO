import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../Home";
import { MemoryRouter } from "react-router-dom";
import { getAllProducts, getProductsByCategory } from "../../../services/ProductService";
import { getCategories } from "../../../services/CategoryService";
import { mockProducts } from "../moks/mockProducts";
import { mockProductsByCategory } from "../moks/mockCategoryProducts";
import { mockCategories } from "../moks/mockCategories";

jest.mock("../../../services/ProductService", () => ({
  getAllProducts: jest.fn(),
  getProductsByCategory: jest.fn(),
}));

jest.mock("../../../services/CategoryService", () => ({
  getCategories: jest.fn(),
}));

const renderHome = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe("Prueba Unitaria: Page Home", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    (getProductsByCategory as jest.Mock).mockResolvedValue(mockProductsByCategory);
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("muestra advertencia si la búsqueda tiene menos de 3 caracteres", async () => {
    renderHome();

    const input = await screen.findByPlaceholderText(/Buscar producto \(mín\. 3 caracteres\)/i);
    fireEvent.change(input, { target: { value: "ip" } });

    expect(await screen.findByText("Mínimo son 3 caracteres")).toBeInTheDocument();
  });

  it("filtra productos si la búsqueda tiene 3 o más caracteres", async () => {
    renderHome();

    const input = await screen.findByPlaceholderText(/Buscar producto \(mín\. 3 caracteres\)/i);

    fireEvent.change(input, { target: { value: "lip" } });

    expect(await screen.findByText("Red Lipstick")).toBeInTheDocument();
    expect(screen.queryByText("Essence Mascara Lash Princess")).not.toBeInTheDocument();
  });

  it("limpia la búsqueda al hacer click en el botón ✕", async () => {
    renderHome();

    const input = await screen.findByPlaceholderText(/Buscar producto \(mín\. 3 caracteres\)/i);

    fireEvent.change(input, { target: { value: "lip" } });
    expect(await screen.findByText("Red Lipstick")).toBeInTheDocument();

    const clearButton = screen.getByText("✕");
    fireEvent.click(clearButton);

    expect(await screen.findByText("Essence Mascara Lash Princess")).toBeInTheDocument();
    expect(await screen.findByText("Red Lipstick")).toBeInTheDocument();
  });

  it("carga productos iniciales con getAllProducts cuando cat es 'all'", async () => {
    renderHome();

    expect(await screen.findByText("Essence Mascara Lash Princess")).toBeInTheDocument();
    expect(await screen.findByText("Eyeshadow Palette with Mirror")).toBeInTheDocument();

    expect(getAllProducts).toHaveBeenCalled();
  });

  it("cambia productos al seleccionar otra categoría", async () => {
    renderHome();

    const categoria = await screen.findByText("Smartphones");
    fireEvent.click(categoria);

    await waitFor(() => {
      expect(getProductsByCategory).toHaveBeenCalledWith("smartphones");
    });

    expect(await screen.findByText("iPhone 13 Pro")).toBeInTheDocument();
  });

  it("no rompe si getAllProducts devuelve undefined", async () => {
    (getAllProducts as jest.Mock).mockResolvedValue(undefined);

    renderHome();

    await waitFor(() => {
      expect(getAllProducts).toHaveBeenCalled();
    });

    expect(screen.queryByText("Essence Mascara Lash Princess")).not.toBeInTheDocument();
  });

  it("no rompe si getProductsByCategory devuelve undefined", async () => {
    (getProductsByCategory as jest.Mock).mockResolvedValue(undefined);

    renderHome();
    const categoria = await screen.findByText("Smartphones");
    fireEvent.click(categoria);

    await waitFor(() => {
      expect(getProductsByCategory).toHaveBeenCalledWith("smartphones");
    });

    expect(screen.queryByText("iPhone 13 Pro")).not.toBeInTheDocument();
  });
});
