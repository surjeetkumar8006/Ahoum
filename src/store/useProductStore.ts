import { create } from "zustand";
import { type Product, CategoryEnum, BrandEnum } from "../types";
import { MOCK_PRODUCTS } from "../data/mockData";

interface ProductFilters {
  categories: CategoryEnum[];
  brands: BrandEnum[];
}

interface ProductState {
  products: Product[];
  activeCategory: CategoryEnum | null;
  searchQuery: string;
  filters: ProductFilters;
  selectedProduct: Product | null;

  // Actions
  setActiveCategory: (category: CategoryEnum | null) => void;
  setSearchQuery: (query: string) => void;
  toggleFilterCategory: (category: CategoryEnum) => void;
  toggleFilterBrand: (brand: BrandEnum) => void;
  clearFilters: () => void;
  setSelectedProduct: (product: Product | null) => void;
  
  // Computes
  getFilteredProducts: () => Product[];
  getExclusiveOffers: () => Product[];
  getBestSellers: () => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: MOCK_PRODUCTS,
  activeCategory: null,
  searchQuery: "",
  filters: {
    categories: [],
    brands: [],
  },
  selectedProduct: null,

  setActiveCategory: (category) => set({ activeCategory: category }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleFilterCategory: (category) => {
    set((state) => {
      const isAlreadyFiltered = state.filters.categories.includes(category);
      const categories = isAlreadyFiltered
        ? state.filters.categories.filter((c) => c !== category)
        : [...state.filters.categories, category];
      return { filters: { ...state.filters, categories } };
    });
  },

  toggleFilterBrand: (brand) => {
    set((state) => {
      const isAlreadyFiltered = state.filters.brands.includes(brand);
      const brands = isAlreadyFiltered
        ? state.filters.brands.filter((b) => b !== brand)
        : [...state.filters.brands, brand];
      return { filters: { ...state.filters, brands } };
    });
  },

  clearFilters: () => set({ filters: { categories: [], brands: [] } }),

  setSelectedProduct: (product) => set({ selectedProduct: product }),

  getFilteredProducts: () => {
    const { products, activeCategory, searchQuery, filters } = get();

    return products.filter((product) => {
      // 1. Search Query filter (case insensitive, name + description)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      // 2. Active Category (direct filter from explore page category)
      if (activeCategory && product.category !== activeCategory) {
        return false;
      }

      // 3. Checkbox Filters: Categories (only active when filters page applies them)
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // 4. Checkbox Filters: Brands
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      return true;
    });
  },

  getExclusiveOffers: () => {
    return get().products.filter((p) => p.isExclusive);
  },

  getBestSellers: () => {
    return get().products.filter((p) => p.isBestSelling);
  },
}));
