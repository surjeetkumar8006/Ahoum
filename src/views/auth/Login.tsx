import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, selectLocation, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const success = await login(email, password);
    if (success) {
      // Auto-set a mock location if none existed
      selectLocation("Dhaka", "Banasree");
      navigate("/shop");
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setter(e.target.value);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between p-6 select-none animate-fade-in">
      
      {/* Top Section */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Carrot Brand Icon */}
        <div className="flex justify-center mb-10">
          <span className="text-5xl animate-pulse">🥕</span>
        </div>

        {/* Form Titles */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-bold text-dark mb-1">
            Loging
          </h2>
          <p className="text-xs text-dark-muted font-medium">
            Enter your emails and password
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div className="flex flex-col text-left">
            <label className="text-xs text-dark-muted font-bold mb-1.5">Email</label>
            <input
              type="email"
              placeholder="imran@taspia.com"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
              className="w-full bg-transparent border-b border-gray-200 pb-2.5 text-dark font-medium text-base focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col text-left relative">
            <label className="text-xs text-dark-muted font-bold mb-1.5">Password</label>
            <div className="relative border-b border-gray-200 pb-2.5 flex items-center focus-within:border-primary transition-colors">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handleInputChange(setPassword)}
                required
                className="w-full bg-transparent border-none p-0 text-dark font-medium text-base focus:outline-none placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 text-dark-muted hover:text-dark focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="#" className="text-xs text-dark font-medium hover:text-primary transition-colors">
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-semibold text-left mt-2 animate-shake">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary hover:bg-primary-dark active:scale-98 text-white font-bold rounded-2xl shadow-md transition-all duration-300 mt-8 focus:outline-none flex items-center justify-center"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Switch to Sign Up */}
        <div className="text-center mt-6 text-sm font-semibold text-dark">
          <span>Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-primary hover:underline font-bold"
          >
            Singup
          </button>
        </div>
      </div>

      <div className="h-4"></div>
    </div>
  );
};
