import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";
import { useProductStore } from "../../store/useProductStore";
import { CategoryEnum, BrandEnum } from "../../types";

export const Search: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    getFilteredProducts,
    filters,
    toggleFilterCategory,
    toggleFilterBrand,
    clearFilters,
  } = useProductStore();

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced Search Sync
  useEffect(() => {
    if (localQuery !== searchQuery) {
      setIsSearching(true);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        setSearchQuery(localQuery);
        setIsSearching(false);
      }, 300);
    }
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [localQuery, searchQuery, setSearchQuery]);

  // Sync state if searchQuery changes externally (e.g. from header search)
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const filteredProducts = getFilteredProducts();

  const allCategories = Object.values(CategoryEnum);
  const allBrands = Object.values(BrandEnum);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Checkboxes */}
      <div>
        <h3 className="font-extrabold text-base text-dark mb-4 pb-2 border-b border-gray-100">Categories</h3>
        <div className="space-y-3">
          {allCategories.map((category) => {
            const isChecked = filters.categories.includes(category);
            return (
              <label key={category} className="flex items-center space-x-3 cursor-pointer group text-sm font-semibold select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFilterCategory(category)}
                  className="w-5 h-5 accent-primary border-gray-300 rounded cursor-pointer"
                />
                <span className={`transition-colors group-hover:text-primary ${isChecked ? "text-primary font-bold" : "text-dark"}`}>
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div>
        <h3 className="font-extrabold text-base text-dark mb-4 pb-2 border-b border-gray-100">Brand</h3>
        <div className="space-y-3">
          {allBrands.map((brand) => {
            const isChecked = filters.brands.includes(brand);
            return (
              <label key={brand} className="flex items-center space-x-3 cursor-pointer group text-sm font-semibold select-none">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFilterBrand(brand)}
                  className="w-5 h-5 accent-primary border-gray-300 rounded cursor-pointer"
                />
                <span className={`transition-colors group-hover:text-primary ${isChecked ? "text-primary font-bold" : "text-dark"}`}>
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={clearFilters}
        className="w-full py-2.5 bg-bg-light hover:bg-gray-100 text-dark-muted font-bold rounded-xl text-xs transition-colors focus:outline-none"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="w-full bg-white px-4 md:px-6 pt-4 pb-6 select-none animate-fade-in relative">
      
      {/* Mobile Top Search Bar & Filter trigger */}
      <div className="flex items-center space-x-3 mb-6 [.desktop-layout-active_&]:hidden">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted">
            <SearchIcon size={18} />
          </span>
          <input
            type="text"
            placeholder="Search Store"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full bg-bg-light border border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-xs font-semibold text-dark placeholder-dark-muted focus:outline-none focus:bg-white focus:border-primary/20 transition-all"
          />
          {localQuery && (
            <button
              onClick={() => setLocalQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className={`p-3.5 bg-bg-light hover:bg-gray-100 rounded-2xl text-dark focus:outline-none relative transition-colors ${
            filters.categories.length > 0 || filters.brands.length > 0 ? "border border-primary bg-primary-soft text-primary" : ""
          }`}
        >
          <SlidersHorizontal size={18} />
          {(filters.categories.length > 0 || filters.brands.length > 0) && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border border-white"></span>
          )}
        </button>
      </div>

      {/* Desktop Search Header */}
      <div className="hidden [.desktop-layout-active_&]:flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-extrabold text-dark tracking-tight">
          {localQuery ? `Search Results for "${localQuery}"` : "Search Products"}
        </h1>
        <span className="text-xs text-dark-muted font-semibold">
          Found {filteredProducts.length} items
        </span>
      </div>

      {/* Split Content layout (Desktop Sidebar vs Mobile Backdrop Drawer) */}
      <div className="flex [.desktop-layout-active_&]:space-x-8">
        
        {/* Left Sidebar Filters (Desktop Only) */}
        <aside className="hidden [.desktop-layout-active_&]:block w-64 shrink-0 bg-white border border-gray-100 p-6 rounded-2xl h-fit sticky top-24 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-lg text-dark">Filters</h2>
            {(filters.categories.length > 0 || filters.brands.length > 0) && (
              <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {filters.categories.length + filters.brands.length} Active
              </span>
            )}
          </div>
          <FilterContent />
        </aside>

        {/* Right side: Results list */}
        <div className="flex-1">
          {isSearching ? (
            /* Skeleton Loading State */
            <div className="grid grid-cols-2 [.desktop-layout-active_&]:grid-cols-4 gap-4 animate-fade-in">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-[18px] border border-gray-50 p-4 flex flex-col justify-between h-56 animate-pulse">
                  <div className="h-24 bg-gray-100 rounded-xl mb-3"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-100 rounded w-1/3"></div>
                    <div className="w-8 h-8 bg-gray-100 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <span className="text-6xl mb-4">🔍</span>
              <h2 className="text-lg font-bold text-dark mb-1">No products found</h2>
              <p className="text-xs text-dark-muted max-w-[240px] mx-auto leading-relaxed">
                We couldn't find any match for your search. Try checking your spelling or clearing filters.
              </p>
              {(localQuery || filters.categories.length > 0 || filters.brands.length > 0) && (
                <button
                  onClick={() => {
                    setLocalQuery("");
                    setSearchQuery("");
                    clearFilters();
                  }}
                  className="mt-6 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow hover:bg-primary-dark transition-colors"
                >
                  Reset Search & Filters
                </button>
              )}
            </div>
          ) : (
            /* Grid View (2 cols mobile, 4 cols desktop) */
            <div className="grid grid-cols-2 [.desktop-layout-active_&]:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Slide-Up Filter Drawer Backdrop */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-fade-in flex items-end justify-center [.desktop-layout-active_&]:hidden"
          onClick={() => setIsFilterOpen(false)}
        >
          {/* Drawer Modal Body */}
          <div
            className="w-full max-h-[85vh] bg-white rounded-t-[30px] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-1 -ml-1 text-dark hover:text-red-500 focus:outline-none"
              >
                <X size={24} />
              </button>
              <h2 className="text-lg font-bold text-dark">Filters</h2>
              <div className="w-6"></div>
            </div>

            {/* Content list */}
            <div className="flex-1 pb-6">
              <FilterContent />
            </div>

            {/* Apply Action */}
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-md hover:bg-primary-dark active:scale-98 transition-all focus:outline-none"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
