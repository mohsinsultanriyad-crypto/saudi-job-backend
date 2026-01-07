
import React, { useState, useRef } from 'react';

interface HeaderProps {
  onAdminGesture: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminGesture }) => {
  const [tapCount, setTapCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const handleLogoTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (timerRef.current) window.clearTimeout(timerRef.current);

    if (newCount >= 5) {
      onAdminGesture();
      setTapCount(0);
    } else {
      timerRef.current = window.setTimeout(() => {
        setTapCount(0);
      }, 2000); // Reset count after 2 seconds of inactivity
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-10 select-none">
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer active:scale-95 transition-transform"
          onClick={handleLogoTap}
        >
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">
            SAUDI <span className="text-green-600">JOB</span>
          </h1>
        </div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          Kingdom of Saudi Arabia
        </div>
      </div>
      {tapCount > 0 && tapCount < 5 && (
        <div className="absolute top-full left-0 w-full h-0.5 bg-gray-100">
          <div 
            className="h-full bg-green-500 transition-all duration-300" 
            style={{ width: `${(tapCount / 5) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
