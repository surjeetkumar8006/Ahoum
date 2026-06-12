import React, { useState, useEffect } from "react";
import { Monitor, Smartphone } from "lucide-react";

interface DeviceSimulatorProps {
  children: React.ReactNode;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("mobile");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Treat screens wider than 1024px as desktop capable of simulation
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Force desktop mode layout if simulator mode is set to desktop
  useEffect(() => {
    const html = document.documentElement;
    if (isDesktop && viewMode === "desktop") {
      html.classList.add("desktop-layout-active");
    } else {
      html.classList.remove("desktop-layout-active");
    }
  }, [isDesktop, viewMode]);

  if (!isDesktop) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F0F16] flex flex-col font-sans text-white overflow-x-hidden">
      {/* Top Floating Control Bar */}
      <header className="h-14 bg-[#1B1B26] border-b border-[#2A2A3B] flex items-center justify-between px-6 z-50 sticky top-0 shrink-0 shadow-md">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent flex items-center">
            <span className="text-xl mr-2 font-black">🥕</span> Nectar Grocer
          </span>
          <span className="text-xs bg-[#2E2E42] px-2 py-1 rounded-full text-dark-light">Internship Assignment</span>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center bg-[#0F0F16] p-1 rounded-xl border border-[#2A2A3B]">
          <button
            onClick={() => setViewMode("mobile")}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
              viewMode === "mobile"
                ? "bg-primary text-white shadow-lg"
                : "text-dark-light hover:text-white"
            }`}
          >
            <Smartphone size={14} />
            <span>Mobile (Figma Strict)</span>
          </button>
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
              viewMode === "desktop"
                ? "bg-primary text-white shadow-lg"
                : "text-dark-light hover:text-white"
            }`}
          >
            <Monitor size={14} />
            <span>Desktop Storefront</span>
          </button>
        </div>

        {/* Right Info */}
        <div className="text-xs text-dark-light flex items-center space-x-3">
          <span className="bg-[#2E2E42] px-2 py-1 rounded text-primary-light font-mono">OTP: 1234</span>
          <span>Press <kbd className="bg-[#2E2E42] px-1 rounded">F12</kbd> for DevTools</span>
        </div>
      </header>

      {/* Main Simulation Viewport */}
      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden bg-radial-gradient">
        {viewMode === "mobile" ? (
          /* Simulated Smartphone Frame */
          <div className="relative mx-auto my-auto transition-all duration-500 transform scale-95 xl:scale-100">
            {/* Phone Case Shell */}
            <div className="w-[395px] h-[855px] bg-[#1A1A24] rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[3px] border-[#3F3F54] flex flex-col relative">
              
              {/* Speaker & Notch */}
              <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-[18px] z-50 flex items-center justify-center">
                <div className="w-[40px] h-[4px] bg-[#333] rounded-full mb-1"></div>
              </div>

              {/* Front Camera Dot */}
              <div className="absolute top-[28px] left-[calc(50%+40px)] w-[6px] h-[6px] bg-[#111] border border-[#222] rounded-full z-50"></div>

              {/* Volume Buttons */}
              <div className="absolute left-[-5px] top-[140px] w-[5px] h-[40px] bg-[#3F3F54] rounded-l-md"></div>
              <div className="absolute left-[-5px] top-[190px] w-[5px] h-[40px] bg-[#3F3F54] rounded-l-md"></div>

              {/* Power Button */}
              <div className="absolute right-[-5px] top-[160px] w-[5px] h-[50px] bg-[#3F3F54] rounded-r-md"></div>

              {/* Inner Screen Container */}
              <div className="flex-1 bg-white rounded-[44px] overflow-hidden relative border border-[#232332] flex flex-col text-dark">
                
                {/* Simulated iOS Status Bar */}
                <div className="h-10 bg-transparent flex items-center justify-between px-7 shrink-0 text-black select-none pointer-events-none z-40 text-xs font-semibold">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1.5">
                    {/* Signal */}
                    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
                      <rect x="0" y="8" width="3" height="3" rx="0.5" />
                      <rect x="4" y="6" width="3" height="5" rx="0.5" />
                      <rect x="8" y="4" width="3" height="7" rx="0.5" />
                      <rect x="12" y="1" width="3" height="10" rx="0.5" />
                    </svg>
                    {/* Wifi */}
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
                      <path d="M7.5 11C8.2 11 8.8 10.4 8.8 9.7C8.8 9 8.2 8.4 7.5 8.4C6.8 8.4 6.2 9 6.2 9.7C6.2 10.4 6.8 11 7.5 11ZM7.5 1.5C9.8 1.5 12 2.4 13.7 4C14 4.3 14.5 4.3 14.8 4C15.1 3.7 15.1 3.2 14.8 2.9C12.8 1 10.2 0 7.5 0C4.8 0 2.2 1 0.2 2.9C-0.1 3.2 -0.1 3.7 0.2 4C0.5 4.3 1 4.3 1.3 4C3 2.4 5.2 1.5 7.5 1.5Z" />
                    </svg>
                    {/* Battery */}
                    <div className="w-[22px] h-[11px] border border-current rounded-[3px] p-[1px] flex items-center">
                      <div className="bg-current h-full w-[85%] rounded-[1px]"></div>
                    </div>
                  </div>
                </div>

                {/* App Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col min-h-0 bg-white">
                  {children}
                </div>

                {/* Simulated iOS Home Indicator */}
                <div className="h-6 bg-transparent flex items-end justify-center pb-2 shrink-0 pointer-events-none select-none z-40">
                  <div className="w-[120px] h-[4px] bg-black/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Responsive Desktop Wrapper */
          <div className="w-full max-w-7xl mx-auto h-[calc(100vh-8.5rem)] bg-white rounded-2xl shadow-2xl border border-[#2A2A3B] overflow-y-auto overflow-x-hidden text-dark transition-all duration-500">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
