import { beforeEach, describe, expect, it } from "vitest";
import { act } from "@testing-library/react";
import { useStore } from "@/store/useStore";
import { products } from "@/data/products";

const product = products[0];

describe("Aura Shop cart and wishlist store", () => {
  beforeEach(() => {
    act(() => {
      useStore.getState().clearCart();
      useStore.setState({
        wishlist: [],
        theme: "light",
      });
    });
  });

  it("adds a product with its selected variant", () => {
    act(() => {
      useStore.getState().addToCart(product, product.variants[0].label, 2);
    });

    const { cart } = useStore.getState();

    expect(cart).toHaveLength(1);
    expect(cart[0].product.id).toBe(product.id);
    expect(cart[0].variant).toBe(product.variants[0].label);
    expect(cart[0].quantity).toBe(2);
  });

  it("merges repeated additions of the same product variant", () => {
    act(() => {
      useStore.getState().addToCart(product, product.variants[0].label, 1);
      useStore.getState().addToCart(product, product.variants[0].label, 3);
    });

    expect(useStore.getState().cart[0].quantity).toBe(4);
  });

  it("keeps different variants as separate cart items", () => {
    const first = product.variants[0].label;
    const second = product.variants[1].label;

    act(() => {
      useStore.getState().addToCart(product, first);
      useStore.getState().addToCart(product, second);
    });

    expect(useStore.getState().cart).toHaveLength(2);
  });

  it("removes an item when its quantity reaches zero", () => {
    act(() => {
      useStore.getState().addToCart(product, product.variants[0].label, 2);
      useStore.getState().updateQuantity(product.id, product.variants[0].label, 0);
    });

    expect(useStore.getState().cart).toHaveLength(0);
  });

  it("calculates cart count and total", () => {
    act(() => {
      useStore.getState().addToCart(product, product.variants[0].label, 2);
    });

    expect(useStore.getState().cartCount()).toBe(2);
    expect(useStore.getState().cartTotal()).toBe(product.price * 2);
  });

  it("toggles wishlist membership", () => {
    act(() => {
      useStore.getState().toggleWishlist(product.id);
    });

    expect(useStore.getState().isWishlisted(product.id)).toBe(true);

    act(() => {
      useStore.getState().toggleWishlist(product.id);
    });

    expect(useStore.getState().isWishlisted(product.id)).toBe(false);
  });
});
