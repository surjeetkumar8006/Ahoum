import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const selectLocation = useAuthStore((state) => state.selectLocation);

  const handleSocialSignIn = async () => {
    // Quick social sign-in simulation
    await login("customer@nectar.com", "password123");
    selectLocation("Dhaka", "Banasree");
    navigate("/shop");
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col justify-between select-none animate-fade-in">
      {/* Top Banner Image */}
      <div className="h-2/5 w-full overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
          alt="Grocery display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col px-6 justify-center max-w-sm mx-auto w-full -mt-6 z-10">
        <div className="mb-8">
          <h2 className="text-[26px] font-bold text-dark leading-tight mb-6 text-left">
            Get your groceries <br /> with nectar
          </h2>
          
          {/* Simulated Mobile Number Input Container */}
          <div
            onClick={() => navigate("/phone")}
            className="w-full border-b border-gray-200 py-3 flex items-center space-x-3 cursor-pointer hover:border-primary transition-colors duration-300"
          >
            {/* Flag & Country Code */}
            <span className="text-xl">🇧🇩</span>
            <span className="text-dark font-semibold text-[17px]">+880</span>
            <span className="text-dark-muted font-normal text-sm flex-1">Enter mobile number</span>
          </div>
        </div>

        {/* Or Divider */}
        <div className="flex items-center justify-center my-6 space-x-3">
          <div className="h-[1px] bg-gray-100 flex-1"></div>
          <span className="text-xs text-dark-muted font-semibold uppercase">Or connect with social media</span>
          <div className="h-[1px] bg-gray-100 flex-1"></div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-4 w-full">
          <button
            onClick={handleSocialSignIn}
            className="w-full py-4 bg-[#5383EC] hover:bg-[#4270D8] active:scale-98 text-white rounded-2xl flex items-center justify-center space-x-4 shadow-sm font-semibold transition-all duration-300 text-sm focus:outline-none"
          >
            {/* Google Icon Logo */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.522 0-6.377-2.855-6.377-6.377s2.855-6.377 6.377-6.377c1.554 0 2.978.553 4.093 1.488l3.12-3.12A11.905 11.905 0 0012.24 0C5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.76 0 12.24-5.48 12.24-12.24 0-.822-.095-1.636-.265-2.428H12.24z" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={handleSocialSignIn}
            className="w-full py-4 bg-[#4A66AC] hover:bg-[#3B5490] active:scale-98 text-white rounded-2xl flex items-center justify-center space-x-4 shadow-sm font-semibold transition-all duration-300 text-sm focus:outline-none"
          >
            {/* Facebook Icon Logo */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* Regular Login Link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline text-sm font-bold"
          >
            Login with Email & Password
          </button>
        </div>
      </div>
      
      {/* Spacer */}
      <div className="h-6"></div>
    </div>
  );
};
