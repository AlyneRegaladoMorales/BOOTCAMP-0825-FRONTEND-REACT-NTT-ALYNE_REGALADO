import { mockProducts } from "../../pages/Home/moks/mockProducts";
import type { CartState } from "../cartReducer";


export const CartItemMock = {
  basic: {
    product: mockProducts[0],
    quantity: 1,
  },
  withLowStock: {
    product: { ...mockProducts[0], stock: 1 },
    quantity: 1,
  },
};

export const CartStateMock: CartState = {
  items: [CartItemMock.basic],
};
