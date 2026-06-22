"use client";

import React, { useState, useEffect } from "react";
import { MerchantAvatar } from "./AvatarStats";

export default function WelcomeDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the welcome dialog
    const hasSeen = sessionStorage.getItem("hasSeenWelcome");
    if (!hasSeen) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    sessionStorage.setItem("hasSeenWelcome", "true");
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // Wait for fade out animation
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex items-end gap-2 sm:gap-3 max-w-[85vw] sm:max-w-md transition-all duration-300 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Dialogue Bubble (Retro Game Style) */}
      <div className="relative bg-[#FFFDFD] border-2 border-[#4E3C44] rounded-xl p-3 sm:p-4 shadow-[4px_4px_0px_0px_#4E3C44] flex-1 mb-2 animate-modal">
        <button 
          onClick={handleClose}
          className="absolute -top-2 -left-2 w-6 h-6 bg-[#D9455B] text-white border-2 border-[#4E3C44] rounded-full flex items-center justify-center font-bold text-xs hover:bg-[#C23A4E] hover:scale-110 active:scale-95 transition-transform z-10 shadow-[2px_2px_0px_0px_#4E3C44]"
          title="Skip"
        >
          ×
        </button>
        <p className="text-[#4E3C44] font-bold text-[11px] sm:text-xs leading-relaxed font-sans typing-effect">
          "Sedang cari apa? Yuk lihat-lihat dulu~"
        </p>
        {/* Dialogue Bubble Tail */}
        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-[#FFFDFD] border-b-2 border-r-2 border-[#4E3C44] transform rotate-45"></div>
      </div>

      {/* Floating Avatar */}
      <div className="shrink-0 drop-shadow-[0_4px_0_rgba(78,60,68,0.15)] animate-[bounce_3s_ease-in-out_infinite]">
        <MerchantAvatar />
      </div>
    </div>
  );
}
