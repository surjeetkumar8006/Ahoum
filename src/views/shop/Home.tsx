import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";
import { useProductStore } from "../../store/useProductStore";
import { useAuthStore } from "../../store/useAuthStore";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getExclusiveOffers, getBestSellers, products, setSearchQuery } = useProductStore();

  const exclusiveOffers = getExclusiveOffers();
  const bestSellers = getBestSellers();
  
  // Custom groceries section filter (Meat/Fish, Eggs)
  const groceries = products.filter(
    (p) => p.category === "Meat & Fish" || p.category === "Dairy & Eggs"
  ).slice(0, 4);

  const handleSearchClick = () => {
    setSearchQuery("");
    navigate("/search");
  };

  return (
    <div className="w-full bg-white px-4 md:px-6 pt-4 pb-6 select-none animate-fade-in">
      
      {/* Mobile Top Location & Carrot Logo (hidden on desktop) */}
      <div className="flex flex-col items-center mb-4 space-y-2 [.desktop-layout-active_&]:hidden">
        <span className="text-3xl animate-bounce">🥕</span>
        <div
          onClick={() => navigate("/location")}
          className="flex items-center space-x-1.5 text-[#181725] font-bold text-sm cursor-pointer hover:text-primary transition-colors"
        >
          <MapPin size={16} className="text-primary" />
          <span>{user?.area ? `${user.area}, ${user.zone}` : "Select Location"}</span>
        </div>
      </div>

      {/* Mobile Search Bar (hidden on desktop) */}
      <div className="mb-5 relative cursor-pointer [.desktop-layout-active_&]:hidden" onClick={handleSearchClick}>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted">
          <Search size={18} />
        </span>
        <div className="w-full bg-bg-light border border-transparent rounded-2xl py-3.5 pl-12 pr-4 text-xs font-semibold text-dark-muted text-left">
          Search Store
        </div>
      </div>

      {/* Hero Offer Banner */}
      <div className="w-full rounded-[18px] bg-gradient-to-r from-[#EAF5EF] to-[#D5EADF] border border-[#BDE3CE]/30 flex items-center justify-between mb-6 p-4 md:p-6 shadow-sm relative overflow-hidden select-none">
        {/* Floating circles background */}
        <span className="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></span>
        <span className="absolute -left-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-lg"></span>

        <div className="relative z-10 text-left max-w-[55%]">
          <h2 className="font-extrabold text-base md:text-2xl text-dark leading-snug">
            Fresh Vegetables
          </h2>
          <p className="text-primary font-bold text-[10px] md:text-sm mt-1 uppercase tracking-wider">
            Get up to 40% off
          </p>
        </div>

        {/* Veggie Graphic */}
        <div className="h-16 w-24 md:h-24 md:w-36 flex items-center justify-end shrink-0 z-10 relative">
          <img
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=300&auto=format&fit=crop&q=80"
            alt="Fresh veggies"
            className="max-h-full max-w-full object-contain filter drop-shadow-md rounded-xl"
          />
        </div>
      </div>

      {/* Section 1: Exclusive Offer */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl [.desktop-layout-active_&]:text-2xl font-bold text-dark tracking-tight">
            Exclusive Offer
          </h2>
          <button
            onClick={() => navigate("/explore")}
            className="text-primary hover:underline text-xs [.desktop-layout-active_&]:text-sm font-bold flex items-center"
          >
            See all
          </button>
        </div>

        {/* Horizontal scroll on mobile, Grid on desktop */}
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-3 [.desktop-layout-active_&]:grid [.desktop-layout-active_&]:grid-cols-4 [.desktop-layout-active_&]:gap-5 [.desktop-layout-active_&]:space-x-0 [.desktop-layout-active_&]:overflow-x-visible [.desktop-layout-active_&]:pb-0">
          {exclusiveOffers.map((product) => (
            <div key={product.id} className="w-[155px] shrink-0 [.desktop-layout-active_&]:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Best Selling */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl [.desktop-layout-active_&]:text-2xl font-bold text-dark tracking-tight">
            Best Selling
          </h2>
          <button
            onClick={() => navigate("/explore")}
            className="text-primary hover:underline text-xs [.desktop-layout-active_&]:text-sm font-bold flex items-center"
          >
            See all
          </button>
        </div>

        {/* Horizontal scroll on mobile, Grid on desktop */}
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-3 [.desktop-layout-active_&]:grid [.desktop-layout-active_&]:grid-cols-4 [.desktop-layout-active_&]:gap-5 [.desktop-layout-active_&]:space-x-0 [.desktop-layout-active_&]:overflow-x-visible [.desktop-layout-active_&]:pb-0">
          {bestSellers.map((product) => (
            <div key={product.id} className="w-[155px] shrink-0 [.desktop-layout-active_&]:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Groceries */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl [.desktop-layout-active_&]:text-2xl font-bold text-dark tracking-tight">
            Groceries
          </h2>
          <button
            onClick={() => navigate("/explore")}
            className="text-primary hover:underline text-xs [.desktop-layout-active_&]:text-sm font-bold flex items-center"
          >
            See all
          </button>
        </div>

        {/* Quick grocery category pills */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar mb-4 pb-1">
          <div
            onClick={() => navigate("/category/Meat & Fish")}
            className="flex items-center space-x-3 bg-[#F8E3E3]/40 border border-[#F8E3E3]/80 px-4 py-3 rounded-2xl cursor-pointer hover:bg-[#F8E3E3]/80 transition-colors shrink-0"
          >
            <span className="text-xl">🥩</span>
            <span className="text-sm font-bold text-dark">Meat & Fish</span>
          </div>
          <div
            onClick={() => navigate("/category/Dairy & Eggs")}
            className="flex items-center space-x-3 bg-[#FEF1E2]/40 border border-[#FEF1E2]/80 px-4 py-3 rounded-2xl cursor-pointer hover:bg-[#FEF1E2]/80 transition-colors shrink-0"
          >
            <span className="text-xl">🥛</span>
            <span className="text-sm font-bold text-dark">Dairy & Eggs</span>
          </div>
          <div
            onClick={() => navigate("/category/Cooking Oil & Ghee")}
            className="flex items-center space-x-3 bg-[#FFF6EE] border border-[#F8A44C]/30 px-4 py-3 rounded-2xl cursor-pointer hover:bg-[#FFF6EE]/80 transition-colors shrink-0"
          >
            <span className="text-xl">🧈</span>
            <span className="text-sm font-bold text-dark">Oil & Ghee</span>
          </div>
        </div>

        {/* Products grid / carousel */}
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-3 [.desktop-layout-active_&]:grid [.desktop-layout-active_&]:grid-cols-4 [.desktop-layout-active_&]:gap-5 [.desktop-layout-active_&]:space-x-0 [.desktop-layout-active_&]:overflow-x-visible [.desktop-layout-active_&]:pb-0">
          {groceries.map((product) => (
            <div key={product.id} className="w-[155px] shrink-0 [.desktop-layout-active_&]:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
