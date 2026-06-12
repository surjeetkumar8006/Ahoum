import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signUp, selectLocation, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) return;

    const success = await signUp(username, email, password);
    if (success) {
      // Auto-set a mock location if none existed, or redirect to select location
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
      
      {/* Form Area */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Carrot Icon */}
        <div className="flex justify-center mb-8">
          <span className="text-5xl animate-pulse">🥕</span>
        </div>

        {/* Title */}
        <div className="text-left mb-6">
          <h2 className="text-2xl font-bold text-dark mb-1">
            Sign Up
          </h2>
          <p className="text-xs text-dark-muted font-medium">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Username Input */}
          <div className="flex flex-col text-left">
            <label className="text-xs text-dark-muted font-bold mb-1">Username</label>
            <input
              type="text"
              placeholder="Afsar Hossen Shuvo"
              value={username}
              onChange={handleInputChange(setUsername)}
              required
              className="w-full bg-transparent border-b border-gray-200 pb-2 text-dark font-medium text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col text-left">
            <label className="text-xs text-dark-muted font-bold mb-1">Email</label>
            <input
              type="email"
              placeholder="imranhf120@gmail.com"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
              className="w-full bg-transparent border-b border-gray-200 pb-2 text-dark font-medium text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col text-left relative">
            <label className="text-xs text-dark-muted font-bold mb-1">Password</label>
            <div className="relative border-b border-gray-200 pb-2 flex items-center focus-within:border-primary transition-colors">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handleInputChange(setPassword)}
                required
                className="w-full bg-transparent border-none p-0 text-dark font-medium text-sm focus:outline-none placeholder-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 text-dark-muted hover:text-dark focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Terms and conditions disclaimer text */}
          <p className="text-[11px] text-dark-muted leading-relaxed text-left pt-2 font-medium">
            By continuing you agree to our{" "}
            <Link to="#" className="text-primary hover:underline font-semibold">Terms of Service</Link>{" "}
            and{" "}
            <Link to="#" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
          </p>

          {error && (
            <p className="text-red-500 text-xs font-semibold text-left mt-2 animate-shake">
              {error}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary hover:bg-primary-dark active:scale-98 text-white font-bold rounded-2xl shadow-md transition-all duration-300 mt-6 focus:outline-none flex items-center justify-center"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Switch to Sign In */}
        <div className="text-center mt-6 text-sm font-semibold text-dark">
          <span>Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline font-bold"
          >
            Singin
          </button>
        </div>
      </div>

      <div className="h-4"></div>
    </div>
  );
};
