import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Store, Search, ShoppingCart, Heart, User } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useCartStore((state) => state.getItemsCount());

  const navItems = [
    { label: "Shop", path: "/shop", icon: Store },
    { label: "Explore", path: "/explore", icon: Search },
    { label: "Cart", path: "/cart", icon: ShoppingCart, badge: cartCount },
    { label: "Favourite", path: "/favorites", icon: Heart },
    { label: "Account", path: "/account", icon: User },
  ];

  // Only show bottom nav on typical mobile view sizes (hidden on desktop view)
  return (
    <div className="block [.desktop-layout-active_&]:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2.5 px-6 flex items-center justify-between z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] rounded-t-[20px] shrink-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.path === "/shop" && location.pathname === "/");
        
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center space-y-1 relative focus:outline-none transition-all duration-300 w-12"
          >
            <div className={`relative p-1 rounded-lg transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
              <Icon
                size={22}
                className={isActive ? "text-primary" : "text-[#181725]"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-medium transition-colors duration-300 ${
                isActive ? "text-primary font-bold" : "text-[#181725]"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
