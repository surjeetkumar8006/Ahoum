import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, LogOut, ChevronRight, Bell, Shield, HelpCircle } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const accountItems = [
    { label: "Delivery Address", desc: user?.area ? `${user.area}, ${user.zone}` : "Select address", icon: MapPin, onClick: () => navigate("/location") },
    { label: "Payment Methods", desc: "Visa **** 4242", icon: CreditCard, onClick: () => navigate("/cart") },
    { label: "Notifications", desc: "Enabled", icon: Bell },
    { label: "Security & Privacy", desc: "Two-Factor Auth", icon: Shield },
    { label: "Help & Support", desc: "FAQ, Chat Support", icon: HelpCircle },
  ];

  return (
    <div className="w-full bg-white px-4 md:px-6 pt-4 pb-6 select-none animate-fade-in flex-1 flex flex-col justify-between">
      
      <div>
        {/* Mobile Header (hidden on desktop) */}
        <h1 className="text-xl font-bold text-center text-dark mb-6 [.desktop-layout-active_&]:hidden">
          Account
        </h1>

        <h1 className="hidden [.desktop-layout-active_&]:block text-2xl font-extrabold text-left text-dark mb-6 tracking-tight">
          My Account
        </h1>

        {/* User Card */}
        <div className="flex items-center space-x-4 border-b border-gray-100 pb-6 mb-6 text-left">
          <div className="w-16 h-16 rounded-full bg-primary-soft text-primary font-black border-2 border-primary/20 flex items-center justify-center text-2xl shadow-sm">
            {user?.username ? user.username.slice(0, 2).toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-dark flex items-center space-x-1.5">
              <span>{user?.username || "Guest User"}</span>
              <span className="text-xs font-normal text-primary bg-primary-soft px-2 py-0.5 rounded-full">Active</span>
            </h2>
            <p className="text-xs text-dark-muted font-medium mt-0.5">{user?.email || "customer@nectar.com"}</p>
          </div>
        </div>

        {/* Account Menu Items */}
        <div className="space-y-1.5">
          {accountItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={item.onClick}
                className={`flex items-center justify-between p-4 rounded-2xl hover:bg-bg-light/40 transition-colors border border-transparent hover:border-gray-100 ${
                  item.onClick ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <div className="flex items-center space-x-4 text-left">
                  <span className="p-2.5 bg-primary-soft text-primary rounded-xl shrink-0">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-dark">{item.label}</h3>
                    <p className="text-[11px] text-dark-muted mt-0.5 font-medium">{item.desc}</p>
                  </div>
                </div>
                
                {item.onClick && (
                  <ChevronRight size={18} className="text-dark-muted" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout Action Button */}
      <div className="mt-10 [.desktop-layout-active_&]:flex [.desktop-layout-active_&]:justify-end">
        <button
          onClick={handleLogout}
          className="w-full [.desktop-layout-active_&]:w-fit [.desktop-layout-active_&]:px-8 py-4 bg-red-50 hover:bg-red-100 active:scale-98 text-red-500 font-bold rounded-2xl shadow-sm transition-all duration-300 focus:outline-none flex items-center justify-center space-x-2 text-sm"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>

    </div>
  );
};
