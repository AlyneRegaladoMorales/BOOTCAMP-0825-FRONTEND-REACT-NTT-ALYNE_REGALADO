import { getAllProductsMapper } from "../../mappers/productsMapper";
import { ProductMock } from "../mocks/productMock";

export const productsStub = getAllProductsMapper(ProductMock.products);
