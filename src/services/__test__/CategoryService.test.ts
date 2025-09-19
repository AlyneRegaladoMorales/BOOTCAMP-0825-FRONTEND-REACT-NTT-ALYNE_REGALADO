import { getCategories } from "../CategoryService";
import { CategoryMock } from "../mocks/categoryMock";
import { categoryStub } from "../stubs/categoryMapperStub";

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

describe("Prueba Unitaria: CategoryService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("Retorna categorías correctamente", async () => {
    MockFetch(CategoryMock);
    const categories = await getCategories();
    expect(categories).toBeDefined();
    expect(categories).toEqual(categoryStub);
  });

  it("Error cuando la API responde diferente a 200", async () => {
    MockFetch({}, 500, false);
    const categoriesPromise = getCategories();
    await expect(categoriesPromise).rejects.toThrow(
      "Algo salio mal, intentelo mas tarde."
    );
  });
});
