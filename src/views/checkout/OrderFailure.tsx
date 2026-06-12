import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export const OrderFailure: React.FC = () => {
  const navigate = useNavigate();
  const setPaymentMethod = useCartStore((state) => state.setPaymentMethod);

  const handleRetry = () => {
    // Reset payment method back to succeeding so they can retry smoothly
    setPaymentMethod("Visa **** 4242");
    navigate("/cart");
  };

  return (
    <div className="w-full h-screen bg-[#181725]/50 flex items-center justify-center p-6 select-none animate-fade-in relative z-50">
      
      {/* Modal Card Layout matching Figma */}
      <div className="w-full max-w-sm bg-white rounded-[30px] p-6 shadow-2xl relative flex flex-col justify-between overflow-hidden border border-gray-100 animate-scale-up">
        
        {/* Top Close Icon Button */}
        <button
          onClick={() => navigate("/cart")}
          className="absolute top-4 left-4 p-1.5 text-dark hover:text-red-500 rounded-full hover:bg-gray-50 transition-all focus:outline-none"
        >
          <X size={20} />
        </button>

        {/* Failure Illustration (Sad Grocery Bag) */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="w-40 h-40 bg-[#FFF2F2] rounded-full flex items-center justify-center border border-red-100 shadow-sm relative">
            
            {/* Custom SVG Sad Grocery Bag Illustration */}
            <svg
              width="85"
              height="85"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F7A59E"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter drop-shadow-sm"
            >
              {/* Paper bag */}
              <path d="M6 20V8h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" fill="#FFF8F8" />
              {/* Sad face on bag */}
              <path d="M10 13h.01M14 13h.01" strokeWidth="2" stroke="#F7A59E" />
              <path d="M10 17a2 2 0 0 1 4 0" /> {/* Sad curved mouth */}
              
              {/* Veggies popping out */}
              <path d="M8 8V6a2 2 0 0 1 4 0v2" stroke="#53B175" /> {/* Green handle/stem */}
              <path d="M12 8V5a2 2 0 0 1 4 0v3" stroke="#F8A44C" /> {/* Carrot/orange stem */}
            </svg>

            {/* Float Red Cancel Badges */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center border-2 border-white font-extrabold text-sm shadow-md animate-bounce">
              ✕
            </span>
          </div>
        </div>

        {/* Text descriptions */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-xl font-bold text-dark mb-2 leading-snug">
            Oops! Order Failed
          </h2>
          <p className="text-xs text-dark-muted font-medium leading-relaxed opacity-95">
            Something went terribly wrong. Your card was declined or a mock transaction failed.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="space-y-3 w-full">
          <button
            onClick={handleRetry}
            className="w-full py-4.5 bg-primary hover:bg-primary-dark active:scale-98 text-white font-extrabold rounded-2xl shadow-lg transition-all focus:outline-none text-sm"
          >
            Please Try Again
          </button>
          
          <button
            onClick={() => navigate("/shop")}
            className="w-full py-3.5 bg-transparent text-dark hover:text-primary font-bold transition-colors focus:outline-none text-sm"
          >
            Back to home
          </button>
        </div>

      </div>

    </div>
  );
};
