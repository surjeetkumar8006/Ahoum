import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Delete } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export const Phone: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const sendOtp = useAuthStore((state) => state.sendOtp);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleKeyPress = (num: string) => {
    if (phone.length < 10) {
      setPhone((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPhone((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (phone.length < 9) return;
    
    const formattedPhone = `+880${phone}`;
    const success = await sendOtp(formattedPhone);
    if (success) {
      navigate("/verification");
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "del"];

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between p-6 select-none animate-fade-in">
      
      {/* Header with back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-dark hover:text-primary transition-colors focus:outline-none"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Title & Input Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-dark mb-8 text-left">
            Enter your mobile number
          </h2>

          <div className="flex flex-col text-left">
            <span className="text-xs text-dark-muted font-bold mb-2">Mobile Number</span>
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3 focus-within:border-primary transition-colors">
              <span className="text-xl">🇧🇩</span>
              <span className="text-dark font-semibold text-lg shrink-0">+880</span>
              <input
                type="text"
                value={phone}
                readOnly
                placeholder="171234567"
                className="text-dark font-semibold text-lg flex-1 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard & Next Button container */}
      <div className="mt-8 flex flex-col space-y-6">
        
        {/* Next Button wrapper */}
        <div className="flex justify-end pr-2">
          <button
            onClick={() => handleSubmit()}
            disabled={phone.length < 9 || isLoading}
            className={`w-[60px] h-[60px] rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
              phone.length >= 9 && !isLoading
                ? "bg-primary hover:bg-primary-dark active:scale-95"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Custom Numeric Grid Keypad */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-8 text-center max-w-xs mx-auto w-full pt-4 border-t border-gray-50">
          {keys.map((key) => {
            if (key === "del") {
              return (
                <button
                  key={key}
                  onClick={handleDelete}
                  className="py-3 font-semibold text-xl text-dark flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 rounded-full focus:outline-none"
                >
                  <Delete size={20} className="text-dark-muted" />
                </button>
              );
            }
            if (key === "*") {
              return (
                <div key={key} className="py-3 font-bold text-xl text-dark-light">
                  +
                </div>
              );
            }
            return (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="py-3 font-bold text-2xl text-dark hover:bg-gray-50 active:bg-gray-100 rounded-full focus:outline-none"
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
