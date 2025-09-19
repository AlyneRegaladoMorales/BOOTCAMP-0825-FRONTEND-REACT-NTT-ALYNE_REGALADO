import { getDistricService } from "../DistricService";
import { DistricMock } from "../mocks/districMock";
import { districStub } from "../stubs/districMapperStub";


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

describe("Prueba Unitaria: DistricService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("Retorna distritos correctamente", async () => {
    MockFetch(DistricMock);
    const districs = await getDistricService();
    expect(districs).toBeDefined();
    expect(districs).toEqual(districStub);
  });

  it("Error cuando la API responde diferente a 200", async () => {
    MockFetch({}, 500, false);
    const promise = getDistricService();
    await expect(promise).rejects.toThrow("Algo salio mal, intentalo mas tarde");
  });
});
