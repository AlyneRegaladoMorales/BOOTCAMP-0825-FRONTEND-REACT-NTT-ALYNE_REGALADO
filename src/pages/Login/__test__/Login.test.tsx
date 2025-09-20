import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { loginPost } from "../../../services/LoginService";
import { useAuth } from "../../../context/AuthProvider";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

jest.mock("../../../services/LoginService", () => ({
  loginPost: jest.fn(),
}));

const mockSaveUser = jest.fn();

jest.mock("../../../context/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe("Pruebas Unitarias: Page Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      saveUser: mockSaveUser,
    });
  });

  it("renderiza formulario y link de recuperar contraseña", () => {
    renderLogin();
    expect(
      screen.getByRole("heading", { name: /Iniciar Sesión/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByText("Olvidé Contraseña")).toBeInTheDocument();
  });

  it("muestra error si usuario y contraseña están vacíos", async () => {
    renderLogin();
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));
    expect(
      await screen.findByText("Usuario y contraseña son obligatorios")
    ).toBeInTheDocument();
  });

  it("muestra error si usuario contiene espacios", async () => {
    renderLogin();
    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: "emilys " },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "emilys pass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));
    expect(
      await screen.findByText("Usuario y contraseña no deben contener espacios")
    ).toBeInTheDocument();
  });

  it("login exitoso llama a saveUser", async () => {
    (loginPost as jest.Mock).mockResolvedValue({ token: "123" });
    renderLogin();

    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: "emilys" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "emilyspass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockSaveUser).toHaveBeenCalledWith({ token: "123" });
    });
  });

  it("login fallido muestra error", async () => {
    (loginPost as jest.Mock).mockResolvedValue(undefined);
    renderLogin();

    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: "emilys" },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: "emilyspassError" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));

    expect(
      await screen.findByText("Usuario o contraseña incorrectos")
    ).toBeInTheDocument();
  });

  it("recuperar contraseña con email inválido muestra error", async () => {
    renderLogin();
    await userEvent.click(screen.getByText("Olvidé Contraseña"));

    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "invalido");

    fireEvent.submit(emailInput.closest("form")!);

    expect(
      await screen.findByText(/Ingrese un correo válido/i)
    ).toBeInTheDocument();
  });

  it("recuperar contraseña con email válido muestra confirmación", async () => {
    renderLogin();
    fireEvent.click(screen.getByText("Olvidé Contraseña"));

    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    fireEvent.change(emailInput, { target: { value: "emilys@correo.com" } });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(
      await screen.findByText("Correo enviado correctamente")
    ).toBeInTheDocument();
  });

  it("redirige al home si ya está autenticado", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      saveUser: mockSaveUser,
    });

    renderLogin();
    expect(
      screen.queryByRole("heading", { name: /Iniciar Sesión/i })
    ).not.toBeInTheDocument();
  });
  

  it("cierra el modal de error al hacer clic en cerrar", async () => {
    renderLogin();
    fireEvent.click(screen.getByRole("button", { name: /Iniciar sesión/i }));
    expect(
      await screen.findByText("Usuario y contraseña son obligatorios")
    ).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Usuario y contraseña son obligatorios")
      ).not.toBeInTheDocument();
    });
  });

  it("cierra el modal de 'Olvidé Contraseña' con handleCloseForgotModal", async () => {
    renderLogin();

    fireEvent.click(screen.getByText("Olvidé Contraseña"));
    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    expect(emailInput).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText("Correo electrónico")
      ).not.toBeInTheDocument();
    });
  });

  it("cierra el modal de confirmación después de enviar correo válido", async () => {
    renderLogin();

    fireEvent.click(screen.getByText("Olvidé Contraseña"));

    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    fireEvent.change(emailInput, { target: { value: "valido@correo.com" } });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(
      await screen.findByText("Correo enviado correctamente")
    ).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /x/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Correo enviado correctamente")
      ).not.toBeInTheDocument();
    });
  });
});
