import { describe, expect, it } from 'vitest';
import {
  addCartQuantity,
  adjustCartQuantity,
  getCartSummary,
  removeCartProduct,
  setCartQuantity,
} from '../Utils/CartLogic';

const Products = [
  { id: 'p1', price: 12500, name: 'Notebook' },
  { id: 'p2', price: 23000, name: 'Tote' },
  { id: 'p3', price: 18000, name: 'Mug' },
];

describe('CartLogic — order totals', () => {
  it('returns a zero summary for an empty cart', () => {
    expect(getCartSummary(Products, {})).toEqual({ items: [], quantity: 0, total: 0 });
  });

  it('calculates the price and total units for multiple different products', () => {
    const summary = getCartSummary(Products, { p1: 2, p2: 1 });
    expect(summary.quantity).toBe(3);
    expect(summary.total).toBe(48000);
    expect(summary.items.map((product) => product.id)).toEqual(['p1', 'p2']);
  });

  it('ignores unknown product ids when calculating a total', () => {
    expect(getCartSummary(Products, { unknown: 10, p3: 1 }).total).toBe(18000);
  });
});

describe('CartLogic — quantity and removal operations', () => {
  it('adds a product to an empty cart', () => {
    expect(addCartQuantity({}, 'p1', 2)).toEqual({ p1: 2 });
  });

  it('adds units to an existing product without changing the others', () => {
    expect(addCartQuantity({ p1: 2, p2: 1 }, 'p1', 3)).toEqual({ p1: 5, p2: 1 });
  });

  it('caps the quantity at 999 units', () => {
    expect(addCartQuantity({ p1: 995 }, 'p1', 10)).toEqual({ p1: 999 });
    expect(adjustCartQuantity({ p1: 999 }, 'p1', 1)).toEqual({ p1: 999 });
  });

  it('increases or decreases a quantity by a single unit', () => {
    expect(adjustCartQuantity({ p1: 2 }, 'p1', 1)).toEqual({ p1: 3 });
    expect(adjustCartQuantity({ p1: 2 }, 'p1', -1)).toEqual({ p1: 1 });
  });

  it('removes the entry when its quantity reaches zero', () => {
    expect(adjustCartQuantity({ p1: 1, p2: 3 }, 'p1', -1)).toEqual({ p2: 3 });
  });

  it('does not create negative quantities', () => {
    expect(adjustCartQuantity({ p1: 1 }, 'p1', -10)).toEqual({});
  });

  it('sets a product quantity to an exact value', () => {
    expect(setCartQuantity({ p1: 1, p2: 3 }, 'p1', 7)).toEqual({ p1: 7, p2: 3 });
  });

  it('treats a zero or negative edited quantity as a removal', () => {
    expect(setCartQuantity({ p1: 3 }, 'p1', 0)).toEqual({});
    expect(setCartQuantity({ p1: 3 }, 'p1', -2)).toEqual({});
  });

  it('removes only the selected type of product', () => {
    expect(removeCartProduct({ p1: 4, p2: 2 }, 'p1')).toEqual({ p2: 2 });
  });

  it('never mutates the original cart', () => {
    const original = { p1: 2, p2: 1 };
    adjustCartQuantity(original, 'p1', 1);
    setCartQuantity(original, 'p1', 3);
    removeCartProduct(original, 'p1');
    expect(original).toEqual({ p1: 2, p2: 1 });
  });
});
