import React from "react";
import { useNavigate } from "react-router-dom";

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-end p-6 select-none relative"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 100%), url('https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&auto=format&fit=crop&q=80')`,
      }}
    >
      <div className="flex flex-col items-center text-center text-white mb-10 max-w-sm mx-auto animate-fade-in-up">
        {/* Carrot Icon */}
        <span className="text-5xl mb-4 animate-bounce">🥕</span>

        <h1 className="text-4xl font-extrabold text-white leading-tight mb-2 tracking-tight">
          Welcome <br /> to our store
        </h1>
        
        <p className="text-sm text-gray-200 font-medium opacity-90 mb-8 max-w-[250px] mx-auto">
          Get your groceries in as fast as one hour
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="w-full py-4 bg-primary hover:bg-primary-dark active:scale-98 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 focus:outline-none"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
