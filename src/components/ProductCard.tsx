import React from "react";
import { Link } from "react-router-dom";
import { Plus, Heart } from "lucide-react";
import type { Product } from "../types";
import { useCartStore } from "../store/useCartStore";
import { useFavoriteStore } from "../store/useFavoriteStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  
  const isFav = isFavorite(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className="group bg-white rounded-[18px] border border-gray-100 p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative select-none">
      {/* Favorite Heart Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-50 z-10 text-dark-muted hover:text-red-500 transition-colors focus:outline-none"
      >
        <Heart
          size={14}
          className={isFav ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      {/* Product Image Link */}
      <Link to={`/product/${product.id}`} className="flex flex-col items-center pt-1">
        <div className="h-20 md:h-24 flex items-center justify-center overflow-hidden w-full mb-2.5">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-dark text-xs md:text-sm leading-tight hover:text-primary transition-colors line-clamp-2 min-h-[2rem]">
            {product.name}
          </h3>
          <span className="text-[10px] text-dark-muted block mt-0.5">
            {product.unit}
          </span>
        </Link>

        {/* Footer Area: Price & Plus Button */}
        <div className="flex items-center justify-between mt-2.5">
          <span className="font-extrabold text-sm md:text-base text-dark">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className="w-8 h-8 md:w-9 md:h-9 bg-primary hover:bg-primary-dark text-white rounded-[10px] md:rounded-[13px] flex items-center justify-center transition-colors shadow-sm focus:outline-none active:scale-95"
            title="Add to basket"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
