import { create } from "zustand";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  wishlist: string[];
  user: { name: string; email: string; phone: string; avatar: string } | null;
  theme: "light" | "dark";

  addToCart: (product: Product, variant: string, quantity?: number) => void;
  removeFromCart: (productId: string, variant: string) => void;
  updateQuantity: (productId: string, variant: string, quantity: number) => void;
  clearCart: () => void;

  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  setUser: (user: AppState["user"]) => void;
  toggleTheme: () => void;

  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<AppState>((set, get) => ({
  cart: [],
  wishlist: [],
  user: { name: "Alex Kumar", email: "alex@example.com", phone: "+91 98765 43210", avatar: "" },
  theme: "light",

  addToCart: (product, variant, quantity = 1) => {
    const { cart } = get();
    const existing = cart.find((i) => i.product.id === product.id && i.variant === variant);
    if (existing) {
      set({ cart: cart.map((i) => (i.product.id === product.id && i.variant === variant ? { ...i, quantity: i.quantity + quantity } : i)) });
    } else {
      set({ cart: [...cart, { product, variant, quantity }] });
    }
  },

  removeFromCart: (productId, variant) => {
    set({ cart: get().cart.filter((i) => !(i.product.id === productId && i.variant === variant)) });
  },

  updateQuantity: (productId, variant, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, variant);
      return;
    }
    set({ cart: get().cart.map((i) => (i.product.id === productId && i.variant === variant ? { ...i, quantity } : i)) });
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (productId) => {
    const { wishlist } = get();
    set({ wishlist: wishlist.includes(productId) ? wishlist.filter((id) => id !== productId) : [...wishlist, productId] });
  },

  isWishlisted: (productId) => get().wishlist.includes(productId),

  setUser: (user) => set({ user }),
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    set({ theme: next });
  },

  cartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
}));
