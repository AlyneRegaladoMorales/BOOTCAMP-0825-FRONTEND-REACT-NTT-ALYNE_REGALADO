import { render, screen, waitFor, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthProvider";
import { getUserInfo } from "../../services/UserService";
import { requestNewAccessToken } from "../../services/LoginService";
import { UserMock } from "../mocks/UserMock";
import { AuthMock } from "../mocks/AuthMock";

jest.mock("../../services/UserService", () => ({
  getUserInfo: jest.fn(),
}));

jest.mock("../../services/LoginService", () => ({
  requestNewAccessToken: jest.fn(),
}));

describe("AuthProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renderiza children después de que termina el loader", async () => {
    render(
      <AuthProvider>
        <div>Contenido</div>
      </AuthProvider>
    );

    expect(await screen.findByText("Contenido")).toBeInTheDocument();
  });

  it("cuando no hay token -> queda sin autenticar", async () => {
    render(
      <AuthProvider>
        <div>App</div>
      </AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
    });

    expect(getUserInfo).not.toHaveBeenCalled();
    expect(requestNewAccessToken).not.toHaveBeenCalled();
  });

  it("cuando hay refreshToken pero no accessToken -> pide nuevo token y obtiene user", async () => {
    localStorage.setItem(
      "refreshToken",
      JSON.stringify({ refreshToken: "refresh123" })
    );

    (requestNewAccessToken as jest.Mock).mockResolvedValue("newAccess123");
    (getUserInfo as jest.Mock).mockResolvedValue(UserMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    expect(requestNewAccessToken).toHaveBeenCalledWith("refresh123");
    expect(getUserInfo).toHaveBeenCalledWith("newAccess123");
  });

  it("saveUser guarda sesión correctamente", async () => {
    (getUserInfo as jest.Mock).mockResolvedValue(UserMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.saveUser(AuthMock);
    });

    expect(localStorage.getItem("refreshToken")).toContain(AuthMock.refreshToken);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("getRefreshToken devuelve null si no hay nada en localStorage", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.getRefreshToken()).toBeNull();
  });

  it("signOut limpia todo y setea autenticación en false", async () => {
    (getUserInfo as jest.Mock).mockResolvedValue(UserMock);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.saveUser(AuthMock);
    });

    await act(async () => {
      result.current.signOut();
    });

    expect(localStorage.getItem("refreshToken")).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
