import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  // Trigger confetti or success audio if wanted
  useEffect(() => {
    // Confetti simulation console logs
    console.log("🎉 Order placed successfully!");
  }, []);

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-between p-6 select-none animate-fade-in relative overflow-hidden">
      
      {/* Confetti Floating Shapes background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
        <span className="absolute top-1/3 right-1/4 w-4 h-2 bg-blue-400 rotate-12 rounded animate-bounce"></span>
        <span className="absolute bottom-1/3 left-1/3 w-3 h-4 bg-yellow-400 -rotate-45 rounded animate-pulse"></span>
        <span className="absolute bottom-1/4 right-1/3 w-3.5 h-3.5 bg-primary/40 rounded-full animate-ping"></span>
      </div>

      {/* Main Info */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto z-10">
        {/* Large Green Check Ring */}
        <div className="w-40 h-40 bg-[#E8F5EC] rounded-full flex items-center justify-center border border-primary/10 shadow-lg mb-8 relative">
          <span className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></span>
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-md">
            <Check size={48} className="text-white" strokeWidth={3.5} />
          </div>
        </div>

        {/* Text descriptions */}
        <h2 className="text-2xl font-bold text-dark text-center leading-snug mb-3">
          Your Order has been <br /> accepted
        </h2>
        <p className="text-xs text-dark-muted font-medium text-center leading-relaxed max-w-[250px] mx-auto opacity-90">
          Your items have been placed and is on its way to being processed
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-4 max-w-sm mx-auto w-full mb-6 relative z-10">
        <button
          onClick={() => alert("Simulated Tracking: Delivery agent is collecting your fresh Nectar items!")}
          className="w-full py-4.5 bg-primary hover:bg-primary-dark text-white font-extrabold rounded-2xl shadow-lg transition-all active:scale-98 focus:outline-none text-sm"
        >
          Track Order
        </button>
        <button
          onClick={() => navigate("/shop")}
          className="w-full py-3.5 bg-transparent text-dark hover:text-primary font-bold transition-colors focus:outline-none text-sm"
        >
          Back to home
        </button>
      </div>

    </div>
  );
};
