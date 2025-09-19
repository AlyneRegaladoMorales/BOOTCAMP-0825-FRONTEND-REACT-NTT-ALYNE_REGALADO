import { ProductMock } from "../mocks/productMock";
import { getAllProducts, getProductsByCategory } from "../ProductService";
import { productsStub } from "../stubs/productMapperStub";


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

describe("Prueba Unitaria: ProductService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    global.fetch = fetch;
  });

  it("Retorna todos los productos correctamente (getAllProducts)", async () => {
    MockFetch(ProductMock);
    const products = await getAllProducts();
    expect(products).toBeDefined();
    expect(products).toEqual(productsStub);
  });

  it("Error en getAllProducts cuando API responde con error", async () => {
    MockFetch({}, 500, false);
    const productsPromise = getAllProducts();
    await expect(productsPromise).rejects.toThrow(
      "Algo salio mal, intentalo mas tarde"
    );
  });

  it("Retorna productos de una categoría correctamente (getProductsByCategory)", async () => {
    MockFetch(ProductMock);
    const products = await getProductsByCategory("fragrances");
    expect(products).toBeDefined();
    expect(products).toEqual(productsStub);
  });

  it("Error en getProductsByCategory cuando API responde con error", async () => {
    MockFetch({}, 404, false);
    const productsPromise = getProductsByCategory("invalid-category");
    await expect(productsPromise).rejects.toThrow(
      "Algo salio mal, intentalo mas tarde"
    );
  });
});
