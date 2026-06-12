import { create } from "zustand";
import type { Product } from "../types";
import { useCartStore } from "./useCartStore";

interface FavoriteState {
  favorites: Product[];
  
  // Actions
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  addAllToCart: () => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => {
  // Load initial favorites from localStorage
  const savedFavorites = localStorage.getItem("nectar_favorites");
  const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

  return {
    favorites: parsedFavorites,

    toggleFavorite: (product) => {
      set((state) => {
        const isFav = state.favorites.some((p) => p.id === product.id);
        let updated: Product[] = [];
        
        if (isFav) {
          updated = state.favorites.filter((p) => p.id !== product.id);
        } else {
          updated = [...state.favorites, product];
        }

        localStorage.setItem("nectar_favorites", JSON.stringify(updated));
        return { favorites: updated };
      });
    },

    isFavorite: (productId) => {
      return get().favorites.some((p) => p.id === productId);
    },

    addAllToCart: () => {
      const { favorites } = get();
      if (favorites.length === 0) return;

      const addToCart = useCartStore.getState().addToCart;
      favorites.forEach((product) => {
        addToCart(product, 1);
      });
      
      // Clear favorites after adding all to cart, or keep them?
      // Usually, it's nice to add them, and maybe we can keep them or clear them.
      // Let's keep them so the user can see them, but we'll add a success indicator or toast.
    },
  };
});
