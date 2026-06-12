import { create } from "zustand";
import type { Product, CartItem } from "../types";

interface PromoCode {
  code: string;
  discountAmount: number;
}

interface CartState {
  cart: CartItem[];
  deliveryMethod: string;
  paymentMethod: string;
  promoCode: PromoCode | null;
  checkoutStatus: "idle" | "loading" | "success" | "failure";
  isCheckoutModalOpen: boolean;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryMethod: (method: string) => void;
  setPaymentMethod: (method: string) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setCheckoutStatus: (status: "idle" | "loading" | "success" | "failure") => void;
  setCheckoutModalOpen: (isOpen: boolean) => void;
  placeOrder: () => Promise<boolean>;

  // Getters
  getItemsCount: () => number;
  getSubtotal: () => number;
  getDeliveryCost: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => {
  // Load initial cart from localStorage
  const savedCart = localStorage.getItem("nectar_cart");
  const parsedCart = savedCart ? JSON.parse(savedCart) : [];

  const saveCartToStorage = (cart: CartItem[]) => {
    localStorage.setItem("nectar_cart", JSON.stringify(cart));
  };

  return {
    cart: parsedCart,
    deliveryMethod: "Home Delivery ($2.00)",
    paymentMethod: "Visa **** 4242",
    promoCode: null,
    checkoutStatus: "idle",
    isCheckoutModalOpen: false,

    addToCart: (product, quantity = 1) => {
      set((state) => {
        const existingIndex = state.cart.findIndex((item) => item.product.id === product.id);
        let updatedCart: CartItem[] = [];

        if (existingIndex > -1) {
          updatedCart = [...state.cart];
          updatedCart[existingIndex].quantity += quantity;
        } else {
          updatedCart = [...state.cart, { product, quantity }];
        }

        saveCartToStorage(updatedCart);
        return { cart: updatedCart };
      });
    },

    removeFromCart: (productId) => {
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.product.id !== productId);
        saveCartToStorage(updatedCart);
        return { cart: updatedCart };
      });
    },

    updateQuantity: (productId, quantity) => {
      set((state) => {
        if (quantity <= 0) {
          const updatedCart = state.cart.filter((item) => item.product.id !== productId);
          saveCartToStorage(updatedCart);
          return { cart: updatedCart };
        }

        const updatedCart = state.cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        saveCartToStorage(updatedCart);
        return { cart: updatedCart };
      });
    },

    clearCart: () => {
      localStorage.removeItem("nectar_cart");
      set({ cart: [], promoCode: null, checkoutStatus: "idle" });
    },

    setDeliveryMethod: (method) => set({ deliveryMethod: method }),

    setPaymentMethod: (method) => set({ paymentMethod: method }),

    applyPromoCode: (code) => {
      const normalizedCode = code.toUpperCase().trim();
      if (normalizedCode === "NECTAR10") {
        set({ promoCode: { code: "NECTAR10", discountAmount: 5.00 } });
        return true;
      }
      if (normalizedCode === "FREESHIP") {
        set({ promoCode: { code: "FREESHIP", discountAmount: 2.00 } });
        return true;
      }
      return false;
    },

    removePromoCode: () => set({ promoCode: null }),

    setCheckoutStatus: (status) => set({ checkoutStatus: status }),

    setCheckoutModalOpen: (isOpen) => set({ isCheckoutModalOpen: isOpen }),

    placeOrder: async () => {
      set({ checkoutStatus: "loading" });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const paymentMethod = get().paymentMethod;
      
      // Check if the payment method selected is specifically designed to fail (for testing error screen)
      if (paymentMethod.toLowerCase().includes("fail")) {
        set({ checkoutStatus: "failure" });
        return false;
      } else {
        set({ checkoutStatus: "success", cart: [] });
        localStorage.removeItem("nectar_cart");
        return true;
      }
    },

    getItemsCount: () => {
      return get().cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    getSubtotal: () => {
      return get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },

    getDeliveryCost: () => {
      const subtotal = get().getSubtotal();
      if (subtotal === 0) return 0;
      
      // Free delivery if promo code FREESHIP or subtotal > $50
      if (get().promoCode?.code === "FREESHIP" || subtotal > 50) return 0;
      
      if (get().deliveryMethod.toLowerCase().includes("free")) return 0;
      return 2.00;
    },

    getTotal: () => {
      const subtotal = get().getSubtotal();
      const delivery = get().getDeliveryCost();
      const discount = get().promoCode?.discountAmount || 0;
      
      const total = subtotal + delivery - discount;
      return Math.max(0, parseFloat(total.toFixed(2)));
    },
  };
});
