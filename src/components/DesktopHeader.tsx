import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, MapPin, LogOut } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { useProductStore } from "../store/useProductStore";

export const DesktopHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = useCartStore((state) => state.getItemsCount());
  const cartTotal = useCartStore((state) => state.getTotal());
  const { user, logout } = useAuthStore();
  const { searchQuery, setSearchQuery } = useProductStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  const navLinks = [
    { label: "Shop", path: "/shop" },
    { label: "Explore", path: "/explore" },
    { label: "Favorites", path: "/favorites" },
  ];

  return (
    <header className="hidden [.desktop-layout-active_&]:block bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm shrink-0">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <Link to="/shop" className="flex items-center space-x-2 mr-6 shrink-0">
          <span className="text-3xl">🥕</span>
          <span className="font-extrabold text-2xl tracking-tight text-primary">nectar</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8 text-sm font-semibold text-dark">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === "/shop" && location.pathname === "/");
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`transition-colors duration-300 relative py-2 ${
                  isActive ? "text-primary font-bold" : "text-dark hover:text-primary"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Location Indicator */}
        <div className="flex items-center space-x-1.5 text-xs text-dark-muted px-4 py-1.5 bg-bg-light rounded-full border border-gray-100 hover:bg-gray-100 cursor-pointer mx-4 max-w-[200px] truncate shrink-0" onClick={() => navigate("/location")}>
          <MapPin size={14} className="text-primary shrink-0" />
          <span className="truncate">
            {user?.area ? `${user.area}, ${user.zone}` : "Select Location"}
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative mx-4 shrink-0">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search store, products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-bg-light border border-transparent rounded-xl py-2 px-11 text-sm text-dark placeholder-dark-muted focus:outline-none focus:bg-white focus:border-primary/30 transition-all duration-300"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-5 shrink-0">
          {/* Favorites */}
          <Link to="/favorites" className="relative p-2 text-dark hover:text-primary transition-colors">
            <Heart size={20} />
          </Link>

          {/* Cart summary box */}
          <Link
            to="/cart"
            className="flex items-center space-x-2.5 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-xl text-sm font-bold border border-primary/10 transition-all duration-300 relative"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            <span className="bg-primary text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-md">
              {cartCount}
            </span>
            {cartCount > 0 && (
              <span className="border-l border-primary/20 pl-2 text-[13px]">
                ${cartTotal.toFixed(2)}
              </span>
            )}
          </Link>

          {/* Account Profile / Logout */}
          <div className="flex items-center space-x-3 border-l border-gray-100 pl-5">
            <Link to="/account" className="flex items-center space-x-2 text-dark hover:text-primary transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-soft text-primary font-bold flex items-center justify-center border border-primary/20 text-xs">
                {user?.username ? user.username.slice(0, 2).toUpperCase() : <User size={16} />}
              </div>
              <span className="text-xs font-semibold max-w-[80px] truncate hidden xl:inline">
                {user?.username || "Guest"}
              </span>
            </Link>
            {user && (
              <button
                onClick={() => {
                  logout();
                  navigate("/signin");
                }}
                title="Logout"
                className="text-dark-muted hover:text-red-500 transition-colors p-2"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
