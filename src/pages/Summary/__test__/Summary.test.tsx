import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAuth } from "../../../context/AuthProvider";
import { loginPost } from "../../../services/LoginService";
import Login from "../../Login/Login";

jest.mock("../../../context/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../../services/LoginService", () => ({
  loginPost: jest.fn(),
}));

const mockSaveUser = jest.fn();

describe("Login component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      saveUser: mockSaveUser,
    });
  });

  it("muestra error si usuario y contraseña están vacíos", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() =>
      expect(screen.getByText(/Usuario y contraseña son obligatorios/i)).toBeInTheDocument()
    );
  });

  it("muestra error si usuario o contraseña tienen espacios", async () => {
    render(<Login />);
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: "emilys" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "emilyspass" } });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() =>
      expect(screen.getByText(/no deben contener espacios/i)).toBeInTheDocument()
    );
  });

  it("login exitoso llama a saveUser", async () => {
    (loginPost as jest.Mock).mockResolvedValue({ accessToken: "123", refreshToken: "456" });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: "emilys" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "emilyspass" } });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => expect(mockSaveUser).toHaveBeenCalledWith({ accessToken: "123", refreshToken: "456" }));
  });

  it("login incorrecto muestra mensaje", async () => {
    (loginPost as jest.Mock).mockResolvedValue(undefined);

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: "emilys" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "error" } });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() =>
      expect(screen.getByText(/Usuario o contraseña incorrectos/i)).toBeInTheDocument()
    );
  });
});
