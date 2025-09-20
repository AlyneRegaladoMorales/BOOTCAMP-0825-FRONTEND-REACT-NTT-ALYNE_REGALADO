import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { AppPaths } from "../../../utils/AppPaths";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { IMAGES } from "../../../utils/Images";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

jest.mock("../../../context/AuthProvider", () => ({
  useAuth: () => ({
    getUser: () => ({ firstName: "emilys", image: "test-avatar.png" }),
    signOut: jest.fn(),
    isAuthenticated: true,
    getAccessToken: () => "fake-token",
  }),
}));

jest.mock("../../../context/CartContext", () => ({
  useCart: () => ({
    state: { items: [{ product: { id: 1, price: 100, stock: 5 }, quantity: 2 }] },
    dispatch: jest.fn(),
  }),
}));

const renderWithRouter = (initialPath = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path={AppPaths.ROOT} element={<Navbar />} />
        <Route path={AppPaths.HOME} element={<h1>Página Home</h1>} />
        <Route path={AppPaths.SUMMARY} element={<h1>Página Summary</h1>} />
        <Route path={AppPaths.PROFILE} element={<h1>Página Profile</h1>} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Pruebas unitarias: Navbar", () => {
  it("navega a Home al hacer click en 'Lista de productos'", async () => {
    renderWithRouter(AppPaths.ROOT);
    const user = userEvent.setup();
    await user.click(screen.getByText("Lista de productos"));
    expect(await screen.findByText("Página Home")).toBeInTheDocument();
  });

  it("navegacion a Summary al hacer click en el carrito", async () => {
    renderWithRouter(AppPaths.ROOT);
    const user = userEvent.setup();
    await user.click(screen.getByAltText("Carrito"));
    expect(await screen.findByText("Página Summary")).toBeInTheDocument();
  });

  it("navega a Profile al hacer click en el avatar", async () => {
    renderWithRouter(AppPaths.ROOT);
    const user = userEvent.setup();
    await user.click(screen.getByText(/Hola,\s*emilys/));
    expect(await screen.findByText("Página Profile")).toBeInTheDocument();
  });

  it("ejecuta signOut correctamente al hacer click en Salir", async () => {
    renderWithRouter(AppPaths.ROOT);
    const user = userEvent.setup();
    await user.click(screen.getByText("Salir"));
    expect(mockNavigate).toHaveBeenCalledWith(AppPaths.ROOT);
    expect(localStorage.getItem("cart")).toBeNull();
  });

  it("muestra la cantidad de items en el carrito", () => {
    renderWithRouter(AppPaths.ROOT);
    expect(screen.getByText(/\(\s*2\s*\)/)).toBeInTheDocument();
  });

  it("usa imagen por defecto si la carga falla", () => {
    renderWithRouter(AppPaths.ROOT);
    const avatar = screen.getByAltText("emilys") as HTMLImageElement;
    fireEvent.error(avatar);
    expect(avatar.src).toContain(IMAGES.DEFAULT_AVATAR);
  });
});
