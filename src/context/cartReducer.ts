import { AppActions } from "../model/CartActions";
import type { Product } from "../model/Products";

interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: AppActions.AddItem; payload: Product }
  | { type: AppActions.RemoveItem; payload: number }
  | { type: AppActions.Increment; payload: number }
  | { type: AppActions.Decrement; payload: number }
  | { type: AppActions.Clear };

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {

  const INCREMENT_STEP = 1;
  const DECREMENT_STEP = 1;
  const DEFAULT_ITEM_QUANTITY = 1;
  const MIN_CART_QUANTITY = 0;
  

  switch (action.type) {
    case AppActions.AddItem: {
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
              ? { ...i, quantity: i.quantity + INCREMENT_STEP }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: DEFAULT_ITEM_QUANTITY }],
      };
    }
    case AppActions.RemoveItem: {
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload),
      };
    }
    case AppActions.Increment: {
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload
            ? { ...i, quantity: i.quantity + INCREMENT_STEP }
            : i
        ),
      };
    }
    case AppActions.Decrement: {
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.payload
              ? { ...i, quantity: i.quantity - DECREMENT_STEP }
              : i
          )
          .filter((i) => i.quantity > MIN_CART_QUANTITY),
      };
    }
    case AppActions.Clear: {
      return { items: [] };
    }
    default:
      return state;
  }
};
