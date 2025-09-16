import type { Product } from "../model/Products";

interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "INCREMENT"; payload: number }
  | { type: "DECREMENT"; payload: number }
  | { type: "CLEAR_CART" };

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id
      );
      if (existing) {
        if (existing.quantity >= existing.product.stock) {
          return state;
        }
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload),
      };
    }
    case "INCREMENT": {
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }
    case "DECREMENT": {
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    }
    case "CLEAR_CART": {
      return { items: [] };
    }
    default:
      return state;
  }
};
