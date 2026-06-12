import React from "react";
import { useLocation } from "react-router-dom";
import { DesktopHeader } from "./DesktopHeader";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Define paths that belong to the Auth / Onboarding flows
  const isAuthRoute =
    path === "/" ||
    path === "/welcome" ||
    path === "/signin" ||
    path === "/phone" ||
    path === "/verification" ||
    path === "/location" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/order-success" ||
    path === "/order-failure";

  if (isAuthRoute) {
    return <div className="w-full h-full bg-white flex flex-col">{children}</div>;
  }

  return (
    <div className="w-full h-full bg-white flex flex-col min-h-screen [.desktop-layout-active_&]:min-h-0 relative">
      {/* Desktop Top Header (hidden on mobile) */}
      <DesktopHeader />

      {/* Main Page Area */}
      <div className="flex-1 w-full mx-auto max-w-7xl pb-[76px] [.desktop-layout-active_&]:pb-12 bg-white flex flex-col">
        {children}
      </div>

      {/* Mobile Bottom Tab Bar (hidden on desktop) */}
      <BottomNav />
    </div>
  );
};
