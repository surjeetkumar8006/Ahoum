import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";
import { useProductStore } from "../../store/useProductStore";
import { type CategoryEnum, BrandEnum } from "../../types";

export const CategoryList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    products,
    filters,
    toggleFilterBrand,
    clearFilters,
  } = useProductStore();

  // Find the category matches
  const activeCategory = id as CategoryEnum;

  // Filter products by the current category AND any checkbox filters
  const filteredProducts = products.filter((product) => {
    // 1. Must match active URL category
    if (product.category !== activeCategory) return false;

    // 2. Must match brand filters if any are selected
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    return true;
  });

  const allBrands = Object.values(BrandEnum);

  const FilterContent = () => (
    <div className="space-y-6">
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
      
      {/* Mobile Top Header (hidden on desktop) */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-3 [.desktop-layout-active_&]:hidden">
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-dark hover:text-primary focus:outline-none transition-colors"
        >
          <ChevronLeft size={26} />
        </button>
        <h1 className="text-lg font-bold text-dark">{activeCategory || "Beverages"}</h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-2 text-dark hover:text-primary focus:outline-none relative transition-colors"
        >
          <SlidersHorizontal size={20} />
          {filters.brands.length > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary rounded-full border border-white"></span>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex [.desktop-layout-active_&]:space-x-8">
        
        {/* Persistent Left Sidebar for Filters (Desktop only) */}
        <aside className="hidden [.desktop-layout-active_&]:block w-64 shrink-0 bg-white border border-gray-100 p-6 rounded-2xl h-fit sticky top-24 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-lg text-dark">Filters</h2>
            {filters.brands.length > 0 && (
              <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {filters.brands.length} Active
              </span>
            )}
          </div>
          <FilterContent />
        </aside>

        {/* Right side: Header & Product Grid */}
        <div className="flex-1">
          {/* Desktop Heading Banner */}
          <div className="hidden [.desktop-layout-active_&]:flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <h1 className="text-2xl font-extrabold text-dark tracking-tight">{activeCategory}</h1>
            <span className="text-xs text-dark-muted font-semibold">
              Showing {filteredProducts.length} items
            </span>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <span className="text-6xl mb-4">🛒</span>
              <h2 className="text-lg font-bold text-dark mb-1">No products found</h2>
              <p className="text-xs text-dark-muted max-w-[200px] mx-auto leading-relaxed">
                We couldn't find matches. Try clearing active filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow hover:bg-primary-dark transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* Product Cards Grid (2 cols mobile, 4 cols desktop) */
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
          {/* Filter Modal Body */}
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
              <div className="w-6"></div> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <FilterContent />
            </div>

            {/* Apply Button */}
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
