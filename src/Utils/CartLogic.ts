// Pure cart operations are shared by the storefront and its unit tests.
export interface CartProduct {
  id: string;
  price: number;
}

export type CartQuantities = Record<string, number>;

export const MAX_CART_QUANTITY = 999;

export function getCartSummary<T extends CartProduct>(products: readonly T[], cart: CartQuantities) {
  const items = products.filter((product) => (cart[product.id] ?? 0) > 0);
  const quantity = items.reduce((count, product) => count + cart[product.id], 0);
  const total = items.reduce((amount, product) => amount + product.price * cart[product.id], 0);
  return { items, quantity, total };
}

export function adjustCartQuantity(cart: CartQuantities, id: string, delta: number): CartQuantities {
  const next = { ...cart };
  const quantity = Math.max(0, (cart[id] ?? 0) + delta);
  if (quantity === 0) delete next[id];
  else next[id] = Math.min(MAX_CART_QUANTITY, quantity);
  return next;
}

export function addCartQuantity(cart: CartQuantities, id: string, quantity: number): CartQuantities {
  return adjustCartQuantity(cart, id, quantity);
}

export function setCartQuantity(cart: CartQuantities, id: string, quantity: number): CartQuantities {
  if (quantity <= 0) return removeCartProduct(cart, id);
  return { ...cart, [id]: Math.min(MAX_CART_QUANTITY, quantity) };
}

export function removeCartProduct(cart: CartQuantities, id: string): CartQuantities {
  const next = { ...cart };
  delete next[id];
  return next;
}
