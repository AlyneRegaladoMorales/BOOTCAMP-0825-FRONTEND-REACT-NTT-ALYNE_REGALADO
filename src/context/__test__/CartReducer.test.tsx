import { cartReducer, type CartAction, type CartState,  } from "../cartReducer";
import { AppActions } from "../../model/CartActions";
import { mockProducts } from "../../pages/Home/moks/mockProducts";
import { CartItemMock } from "../mocks/CartItemMock";

describe("cartReducer", () => {
  it("agrega un producto nuevo con AddItem", () => {
    const initialState: CartState = { items: [] };
    const action: CartAction = {
      type: AppActions.AddItem,
      payload: mockProducts[0],
    };
    const result = cartReducer(initialState, action);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].product.id).toBe(mockProducts[0].id);
    expect(result.items[0].quantity).toBe(1);
  });

  it("incrementa cantidad si el producto ya existe", () => {
    const state: CartState = {
      items: [{ product: mockProducts[0], quantity: 1 }],
    };
    const action: CartAction = {
      type: AppActions.AddItem,
      payload: mockProducts[0],
    };
    const result = cartReducer(state, action);

    expect(result.items[0].quantity).toBe(2);
  });

  it("no permite superar el stock al agregar", () => {
    const state: CartState = {
      items: [{ product: { ...mockProducts[0], stock: 1 }, quantity: 1 }],
    };
    const action: CartAction = {
      type: AppActions.AddItem,
      payload: { ...mockProducts[0], stock: 1 },
    };
    const result = cartReducer(state, action);

    expect(result.items[0].quantity).toBe(1);
  });

  it("elimina un producto con RemoveItem", () => {
    const state: CartState = {
      items: [{ product: mockProducts[0], quantity: 2 }],
    };
    const action: CartAction = {
      type: AppActions.RemoveItem,
      payload: mockProducts[0].id,
    };
    const result = cartReducer(state, action);

    expect(result.items).toHaveLength(0);
  });

  it("incrementa cantidad con Increment", () => {
    const state: CartState = {
      items: [{ product: mockProducts[0], quantity: 1 }],
    };
    const action: CartAction = {
      type: AppActions.Increment,
      payload: mockProducts[0].id,
    };
    const result = cartReducer(state, action);

    expect(result.items[0].quantity).toBe(2);
  });

  it("decrementa cantidad con Decrement", () => {
    const state: CartState = {
      items: [{ product: mockProducts[0], quantity: 2 }],
    };
    const action: CartAction = {
      type: AppActions.Decrement,
      payload: mockProducts[0].id,
    };
    const result = cartReducer(state, action);

    expect(result.items[0].quantity).toBe(1);
  });

  it("elimina producto si la cantidad llega a 0 con Decrement", () => {
    const state: CartState = {
      items: [{ product: mockProducts[0], quantity: 1 }],
    };
    const action: CartAction = {
      type: AppActions.Decrement,
      payload: mockProducts[0].id,
    };
    const result = cartReducer(state, action);

    expect(result.items).toHaveLength(0);
  });

  it("limpia todo el carrito con Clear", () => {
    const state: CartState = {
      items: [{ product: mockProducts[0], quantity: 5 }],
    };
    const action: CartAction = { type: AppActions.Clear };
    const result = cartReducer(state, action);

    expect(result.items).toHaveLength(0);
  });

  it("devuelve el mismo estado en default", () => {
    const state: CartState = { items: [CartItemMock.basic] };
    const action = { type: "UNKNOWN_ACTION" } as unknown as CartAction;

    const result = cartReducer(state, action);

    expect(result).toEqual(state);
  });
});
