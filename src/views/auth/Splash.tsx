import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/shop");
      } else {
        navigate("/welcome");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="w-full h-screen bg-primary flex items-center justify-center relative overflow-hidden select-none animate-fade-in">
      <div className="flex items-center space-x-3 text-white animate-scale-up">
        {/* Carrot Icon */}
        <span className="text-6xl filter drop-shadow-md">🥕</span>
        <div>
          <h1 className="text-5xl font-black tracking-tight leading-none m-0 text-white">
            nectar
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-white/80 text-left -mt-0.5">
            online grocery
          </p>
        </div>
      </div>
    </div>
  );
};
