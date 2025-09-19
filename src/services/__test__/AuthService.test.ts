import { loginPost, requestNewAccessToken } from "../LoginService";
import { AuthMock } from "../mocks/authMock";
import { authStub } from "../stubs/loginMapperStub";

const MockFetch = (data: any, status = 200, ok = true) => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response = {
      ok,
      status,
      json: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });
  global.fetch = fn;
  return fn;
};

describe("Prueba Unitaria: AuthService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("Login exitoso", async () => {
    MockFetch(AuthMock);
    const user = await loginPost("emilys", "emilyspass");
    expect(user).toBeDefined();
    expect(user).toEqual(authStub);
  });

  it("Login falla con credenciales inválidas (401)", async () => {
    MockFetch({ error: "Invalid credentials" }, 401, false);
    const promise = loginPost("emilysError", "passwordError");
    await expect(promise).rejects.toThrow("Credenciales inválidas");
  });

  it("Login falla con error inesperado", async () => {
    MockFetch({}, 500, false);
    const promise = loginPost("emilys", "emilyspass");
    await expect(promise).rejects.toThrow("Algo salió mal, inténtelo más tarde");
  });

  it("Refresca token exitosamente", async () => {
    MockFetch({ accessToken: "new_access_token" });
    const token = await requestNewAccessToken("refresh_token");
    expect(token).toBe("new_access_token");
  });

  it("Error al refrescar token", async () => {
    MockFetch({}, 403, false);
    const promise = requestNewAccessToken("refresh_tokenError");
    await expect(promise).rejects.toThrow(
      "Algo salió mal, inténtelo más tarde"
    );
  });
});
