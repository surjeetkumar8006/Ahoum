import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Delete } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export const Verification: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [showToast, setShowToast] = useState(false);
  
  const { verifyOtp, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    // Show mock code notification
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (num: string) => {
    clearError();
    const emptyIndex = code.findIndex((val) => val === "");
    if (emptyIndex !== -1) {
      const updated = [...code];
      updated[emptyIndex] = num;
      setCode(updated);
    }
  };

  const handleDelete = () => {
    clearError();
    const lastFilledIndex = [...code].reverse().findIndex((val) => val !== "");
    if (lastFilledIndex !== -1) {
      const targetIndex = 3 - lastFilledIndex;
      const updated = [...code];
      updated[targetIndex] = "";
      setCode(updated);
    }
  };

  const handleResend = () => {
    setCode(["", "", "", ""]);
    clearError();
    setShowToast(true);
  };

  const handleSubmit = async () => {
    const codeString = code.join("");
    if (codeString.length < 4) return;

    const success = await verifyOtp(codeString);
    if (success) {
      navigate("/location");
    }
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];
  const codeString = code.join("");

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between p-6 select-none animate-fade-in relative">
      
      {/* Toast Notification Banner */}
      {showToast && (
        <div className="absolute top-4 left-6 right-6 bg-[#E8F5EC] border border-primary/20 text-[#2D6A4F] px-4 py-3 rounded-2xl text-xs font-semibold shadow-md flex items-center justify-between z-50 animate-bounce">
          <span>🔔 Mock OTP Verification Code is: <strong className="text-sm tracking-widest text-primary ml-1">1234</strong></span>
          <button onClick={() => setShowToast(false)} className="text-primary font-bold">Dismiss</button>
        </div>
      )}

      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-dark hover:text-primary transition-colors focus:outline-none"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Verification Inputs */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-dark mb-2 text-left">
            Enter your 4-digit code
          </h2>
          <p className="text-xs text-dark-muted text-left mb-8">
            Code
          </p>

          <div className="flex space-x-4 max-w-[280px]">
            {code.map((val, idx) => (
              <div
                key={idx}
                className={`flex-1 h-14 border-b-2 text-center text-2xl font-bold flex items-center justify-center transition-all ${
                  val !== "" ? "border-primary text-dark" : "border-gray-200 text-gray-300"
                }`}
              >
                {val || "—"}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-xs font-semibold text-left mt-4 animate-shake">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Controls & Pad */}
      <div className="flex flex-col space-y-6">
        
        {/* Next / Submit Button and Resend link */}
        <div className="flex justify-between items-center pr-2">
          <button
            onClick={handleResend}
            className="text-primary hover:text-primary-dark font-semibold text-sm focus:outline-none"
          >
            Resend Code
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={codeString.length < 4 || isLoading}
            className={`w-[60px] h-[60px] rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
              codeString.length === 4 && !isLoading
                ? "bg-primary hover:bg-primary-dark active:scale-95"
                : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Custom Virtual Pad */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-8 text-center max-w-xs mx-auto w-full pt-4 border-t border-gray-50">
          {keys.map((key, idx) => {
            if (key === "del") {
              return (
                <button
                  key={idx}
                  onClick={handleDelete}
                  className="py-3 font-semibold text-xl text-dark flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 rounded-full focus:outline-none"
                >
                  <Delete size={20} className="text-dark-muted" />
                </button>
              );
            }
            if (key === "") {
              return <div key={idx} className="py-3"></div>;
            }
            return (
              <button
                key={idx}
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
