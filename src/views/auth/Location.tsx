import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { MOCK_ZONES, MOCK_AREAS } from "../../data/mockData";

export const Location: React.FC = () => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const selectLocation = useAuthStore((state) => state.selectLocation);

  const areas = selectedZone ? MOCK_AREAS[selectedZone] || [] : [];

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedZone(e.target.value);
    setSelectedArea("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedZone || !selectedArea) return;
    
    selectLocation(selectedZone, selectedArea);
    navigate("/shop");
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between p-6 select-none animate-fade-in">
      {/* Header and Map Pin Illustration */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-dark hover:text-primary transition-colors focus:outline-none"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Map Illustration (SVG) */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="relative w-44 h-44 bg-[#E8F5EC] rounded-full flex items-center justify-center border border-primary/10">
            {/* Pulsing Rings */}
            <span className="absolute w-36 h-36 bg-primary/10 rounded-full animate-ping opacity-75"></span>
            <span className="absolute w-28 h-28 bg-primary/20 rounded-full animate-pulse"></span>
            
            {/* Custom SVG Location Pin illustration */}
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#53B175"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 filter drop-shadow-md"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#E8F5EC" />
              <circle cx="12" cy="10" r="3" fill="#53B175" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center max-w-xs mx-auto">
          <h2 className="text-2xl font-bold text-dark mb-3">
            Select Your Location
          </h2>
          <p className="text-[13px] text-dark-muted leading-relaxed font-medium">
            Switch on your location to stay in tune with what's happening in your area
          </p>
        </div>
      </div>

      {/* Select inputs and Submit */}
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col space-y-6 flex-1 justify-end max-w-sm mx-auto w-full">
        {/* Zone Dropdown */}
        <div className="flex flex-col text-left">
          <label className="text-xs text-dark-muted font-bold mb-1.5">Your Zone</label>
          <div className="relative border-b border-gray-200 pb-1.5 focus-within:border-primary transition-colors">
            <select
              value={selectedZone}
              onChange={handleZoneChange}
              className="w-full bg-transparent border-none outline-none appearance-none pr-8 py-1.5 text-dark font-semibold text-base cursor-pointer"
            >
              <option value="" disabled>Select your zone</option>
              {MOCK_ZONES.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
            {/* Custom Dropdown Chevron */}
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-dark-muted">▼</span>
          </div>
        </div>

        {/* Area Dropdown */}
        <div className="flex flex-col text-left">
          <label className="text-xs text-dark-muted font-bold mb-1.5">Your Area</label>
          <div className="relative border-b border-gray-200 pb-1.5 focus-within:border-primary transition-colors">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              disabled={!selectedZone}
              className={`w-full bg-transparent border-none outline-none appearance-none pr-8 py-1.5 text-dark font-semibold text-base ${
                selectedZone ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              }`}
            >
              <option value="" disabled>Select your area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-dark-muted">▼</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedZone || !selectedArea}
          className={`w-full py-4 text-white font-bold rounded-2xl shadow-md transition-all duration-300 mt-6 focus:outline-none ${
            selectedZone && selectedArea
              ? "bg-primary hover:bg-primary-dark active:scale-98"
              : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
