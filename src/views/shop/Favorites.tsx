import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useFavoriteStore } from "../../store/useFavoriteStore";

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addAllToCart } = useFavoriteStore();

  const handleAddAll = () => {
    if (favorites.length === 0) return;
    addAllToCart();
    alert("All favorited items added to your basket!");
  };

  return (
    <div className="w-full bg-white px-4 md:px-6 pt-4 pb-6 select-none animate-fade-in relative flex-1 flex flex-col">
      {/* Title */}
      <h1 className="text-xl font-bold text-center text-dark mb-6 [.desktop-layout-active_&]:hidden">
        Favorites
      </h1>

      <h1 className="hidden [.desktop-layout-active_&]:block text-2xl font-extrabold text-left text-dark mb-6 tracking-tight">
        My Favorites List
      </h1>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-400 mb-4 border border-red-100">
            <Heart size={40} className="fill-red-50" />
          </div>
          <h2 className="text-lg font-bold text-dark mb-1">Your favorites list is empty</h2>
          <p className="text-xs text-dark-muted max-w-[220px] mx-auto leading-relaxed">
            Mark items as favorite to save them for later! Explore categories to add.
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="mt-6 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-2xl shadow transition-colors focus:outline-none"
          >
            Explore Categories
          </button>
        </div>
      ) : (
        /* Grid Layout */
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4 max-h-[440px] overflow-y-auto no-scrollbar [.desktop-layout-active_&]:max-h-none [.desktop-layout-active_&]:grid [.desktop-layout-active_&]:grid-cols-2 [.desktop-layout-active_&]:gap-6 [.desktop-layout-active_&]:space-y-0">
            {favorites.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex items-center space-x-4 border-b border-gray-100 pb-4 relative group cursor-pointer hover:bg-gray-50/50 p-2.5 rounded-xl transition-all duration-300 animate-fade-in"
              >
                {/* Product Image */}
                <div className="w-16 h-16 bg-bg-light/30 border border-gray-50 rounded-xl flex items-center justify-center p-1.5 shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-bold text-dark text-sm leading-tight truncate">{product.name}</h3>
                  <span className="text-[10px] text-dark-muted block mt-0.5">{product.unit}</span>
                </div>

                {/* Price and Delete Icon */}
                <div className="flex items-center space-x-4 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <span className="font-extrabold text-sm text-dark">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  {/* Delete Item button */}
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="text-dark-light hover:text-red-500 transition-colors p-1.5"
                    title="Remove from favorites"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="hidden md:flex text-primary hover:translate-x-1 transition-transform p-1.5"
                    title="View details"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add All To Cart Button */}
          <div className="fixed bottom-[76px] left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-30 shrink-0 [.desktop-layout-active_&]:relative [.desktop-layout-active_&]:bottom-0 [.desktop-layout-active_&]:bg-transparent [.desktop-layout-active_&]:border-t-0 [.desktop-layout-active_&]:p-0 [.desktop-layout-active_&]:mt-8 [.desktop-layout-active_&]:flex [.desktop-layout-active_&]:justify-end">
            <button
              onClick={handleAddAll}
              className="w-full [.desktop-layout-active_&]:w-fit [.desktop-layout-active_&]:px-8 py-4.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 active:scale-98 focus:outline-none flex items-center justify-center space-x-2 text-sm"
            >
              <ShoppingCart size={18} />
              <span>Add All To Cart</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
