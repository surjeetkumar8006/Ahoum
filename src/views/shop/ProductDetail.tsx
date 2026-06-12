import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Share2, Heart, Plus, Minus, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import { useCartStore } from "../../store/useCartStore";
import { useFavoriteStore } from "../../store/useFavoriteStore";

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"detail" | "nutrition" | "review" | null>("detail");

  const { products } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleFavorite, isFavorite } = useFavoriteStore();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">😿</span>
        <h2 className="text-lg font-bold text-dark">Product Not Found</h2>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow hover:bg-primary-dark transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const isFav = isFavorite(product.id);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToBasket = () => {
    addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name} to your basket!`);
  };

  const toggleTab = (tab: "detail" | "nutrition" | "review") => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  return (
    <div className="w-full bg-white select-none animate-fade-in pb-12">
      
      {/* Mobile Top Navigation Header */}
      <div className="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 [.desktop-layout-active_&]:hidden">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white/70 backdrop-blur-sm rounded-full text-dark hover:text-primary transition-colors focus:outline-none shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={shareProduct}
          className="p-2 bg-white/70 backdrop-blur-sm rounded-full text-dark hover:text-primary transition-colors focus:outline-none shadow-sm"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 [.desktop-layout-active_&]:pt-8">
        <div className="grid grid-cols-1 [.desktop-layout-active_&]:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column: Large Product Image Card */}
          <div className="w-full bg-bg-light/40 border border-gray-50 rounded-[25px] p-6 flex items-center justify-center h-[300px] [.desktop-layout-active_&]:h-[480px] shadow-sm relative group">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[90%] max-w-[90%] object-contain filter drop-shadow-md group-hover:scale-102 transition-transform duration-500"
            />
            {/* Desktop Share Trigger */}
            <button
              onClick={shareProduct}
              className="hidden [.desktop-layout-active_&]:flex absolute top-4 right-4 p-2.5 bg-white shadow-md border border-gray-100 rounded-full text-dark hover:text-primary hover:scale-105 transition-all focus:outline-none"
              title="Share"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Right Column: Descriptions & Actions */}
          <div className="flex flex-col text-left">
            
            {/* Title & Favorites Heart */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl [.desktop-layout-active_&]:text-3xl font-extrabold text-dark tracking-tight leading-tight">
                  {product.name}
                </h1>
                <span className="text-xs text-dark-muted font-bold block mt-1.5">
                  {product.unit}
                </span>
              </div>
              <button
                onClick={() => toggleFavorite(product)}
                className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
              >
                <Heart
                  size={22}
                  className={isFav ? "fill-red-500 text-red-500" : "text-gray-400"}
                />
              </button>
            </div>

            {/* Quantity adjust & Price Row */}
            <div className="flex items-center justify-between mt-6 border-b border-gray-100 pb-6">
              {/* Quantity Picker */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDecrement}
                  className="w-11 h-11 border border-gray-200 rounded-2xl flex items-center justify-center text-dark-muted hover:border-primary hover:text-primary transition-all active:scale-95 focus:outline-none"
                >
                  <Minus size={18} />
                </button>
                <span className="font-extrabold text-lg w-6 text-center">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-11 h-11 border border-gray-200 rounded-2xl flex items-center justify-center text-primary hover:border-primary active:scale-95 focus:outline-none"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Price */}
              <span className="font-extrabold text-2xl text-dark">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>

            {/* Collapsible Detail Accordions */}
            <div className="mt-6 space-y-4">
              
              {/* Accordion 1: Product Detail */}
              <div className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => toggleTab("detail")}
                  className="w-full flex items-center justify-between font-bold text-sm text-dark py-2.5 focus:outline-none"
                >
                  <span>Product Detail</span>
                  {activeTab === "detail" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {activeTab === "detail" && (
                  <p className="text-xs font-semibold text-dark-muted leading-relaxed mt-2 animate-fade-in">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Accordion 2: Nutritions */}
              <div className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => toggleTab("nutrition")}
                  className="w-full flex items-center justify-between font-bold text-sm text-dark py-2.5 focus:outline-none"
                >
                  <span>Nutritions</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] bg-bg-light px-2 py-0.5 rounded text-dark-muted font-bold font-mono">
                      {product.calories} kcal
                    </span>
                    {activeTab === "nutrition" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {activeTab === "nutrition" && (
                  <div className="text-xs font-semibold text-dark-muted mt-2 space-y-1.5 animate-fade-in">
                    <p>Nutrition details per serving size:</p>
                    <div className="grid grid-cols-2 gap-2 max-w-xs pt-1 font-mono">
                      <div className="bg-bg-light/50 p-2 rounded">Energy: {product.calories} kcal</div>
                      <div className="bg-bg-light/50 p-2 rounded">Protein: ~1.2g</div>
                      <div className="bg-bg-light/50 p-2 rounded">Carbs: ~22g</div>
                      <div className="bg-bg-light/50 p-2 rounded">Fat: ~0.3g</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Reviews */}
              <div className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => toggleTab("review")}
                  className="w-full flex items-center justify-between font-bold text-sm text-dark py-2.5 focus:outline-none"
                >
                  <span>Review</span>
                  <div className="flex items-center space-x-1">
                    <div className="flex text-[#F3603F]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.round(product.rating) ? "fill-[#F3603F]" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-dark-muted pl-1">({product.rating})</span>
                    {activeTab === "review" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>
                {activeTab === "review" && (
                  <div className="text-xs mt-2 space-y-3 animate-fade-in font-semibold text-dark-muted">
                    <div className="border-l-2 border-primary pl-3">
                      <p className="font-bold text-dark">Afsar Hossen Shuvo</p>
                      <p className="italic text-[11px] text-dark-light">"Extremely fresh and delicious, delivery was quick!"</p>
                    </div>
                    <div className="border-l-2 border-primary pl-3">
                      <p className="font-bold text-dark">Imran Hossain</p>
                      <p className="italic text-[11px] text-dark-light">"Very juicy, Nectar is the best grocer."</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Add to Basket Action Button */}
            <button
              onClick={handleAddToBasket}
              className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl shadow-lg transition-all duration-300 mt-8 active:scale-98 focus:outline-none flex items-center justify-center space-x-3 text-base"
            >
              <span>Add To Basket</span>
            </button>

          </div>
        </div>
      </div>

    </div>
  );
};
