import React, { useState } from 'react';

const Badge = ({ badge }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.color} text-white shadow-md whitespace-nowrap cursor-pointer`}>
        <span>{badge.emoji}</span>
        <span className="hidden sm:inline">{badge.name}</span>
      </span>

      {showTooltip && (
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-xl border border-gray-700 animate-fade-in">
          {badge.description}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></span>
        </span>
      )}
    </span>
  );
};

export default Badge;
