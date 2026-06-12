import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { CATEGORIES } from "../../data/mockData";
import { useProductStore } from "../../store/useProductStore";

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useProductStore();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleSearchFocus = () => {
    setSearchQuery("");
    navigate("/search");
  };

  return (
    <div className="w-full bg-white px-4 md:px-6 pt-4 pb-6 select-none animate-fade-in flex flex-col">
      {/* Title */}
      <h1 className="text-xl font-bold text-center text-dark mb-4 lg:hidden">
        Find Products
      </h1>
      
      <h1 className="hidden lg:block text-2xl font-extrabold text-left text-dark mb-6 tracking-tight">
        Categories
      </h1>

      {/* Mobile Search Focus Input */}
      <div className="lg:hidden mb-6 relative" onClick={handleSearchFocus}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted">
          <Search size={18} />
        </span>
        <div className="w-full bg-bg-light border border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-xs font-semibold text-dark-muted text-left">
          Search Store
        </div>
      </div>

      {/* Grid of Categories (2 columns on mobile, 3 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
        {CATEGORIES.map((cat) => {
          return (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`rounded-2xl border p-4 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102 select-none h-44 border-opacity-70 ${cat.bgColor} ${cat.borderColor}`}
            >
              {/* Category Image */}
              <div className="h-20 flex items-center justify-center mb-2 overflow-hidden w-full">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Category Name */}
              <h3 className="font-bold text-sm text-center text-dark leading-tight flex-1 flex items-center justify-center">
                {cat.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
