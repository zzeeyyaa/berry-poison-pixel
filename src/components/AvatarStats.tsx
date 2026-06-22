"use client";

import React, { useState, useEffect } from "react";

// Cute custom 16x16 pixel art shopkeeper SVG avatar
export function MerchantAvatar() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-11 h-11 md:w-18 md:h-18 bg-[#FFF4F4] p-0.5 select-none rounded-full border-2 border-[#4E3C44] shadow-sm"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {/* 1. Back Hair (#2C2124) */}
      <rect x="6" y="11" width="20" height="21" fill="#2C2124" />

      {/* 2. Shirt (Zoomed in / Wide shoulders) */}
      <rect x="3" y="25" width="26" height="7" fill="#8FAD95" />
      <rect x="1" y="27" width="30" height="5" fill="#8FAD95" />

      {/* Shirt Shadow / Collar depth */}
      <rect x="10" y="25" width="12" height="2" fill="#6C8B72" />
      <rect x="7" y="27" width="18" height="1" fill="#6C8B72" />

      {/* 3. Face, Neck & Chest Cutout */}
      {/* Neck Shadow & Skin */}
      <rect x="13" y="23" width="6" height="2" fill="#E8CFC2" />
      <rect x="13" y="24" width="6" height="2" fill="#FDF1EB" />
      {/* Exposed Collar/Chest Skin */}
      <rect x="14" y="26" width="4" height="1" fill="#FDF1EB" />

      {/* Face Base */}
      <rect x="9" y="14" width="14" height="7" fill="#FDF1EB" />
      <rect x="10" y="21" width="12" height="1" fill="#FDF1EB" /> {/* Jaw */}
      <rect x="12" y="22" width="8" height="1" fill="#FDF1EB" /> {/* Chin */}

      {/* 4. Facial Features (Asian Almond Eyes & Subtle detail) */}
      {/* Left Eye */}
      <rect x="10" y="16" width="3" height="1" fill="#2C2124" /> {/* Top Lash */}
      <rect x="13" y="17" width="1" height="1" fill="#2C2124" /> {/* Inner Corner */}
      <rect x="11" y="17" width="2" height="1" fill="#4A2C2A" /> {/* Iris */}

      {/* Right Eye */}
      <rect x="19" y="16" width="3" height="1" fill="#2C2124" /> {/* Top Lash */}
      <rect x="18" y="17" width="1" height="1" fill="#2C2124" /> {/* Inner Corner */}
      <rect x="19" y="17" width="2" height="1" fill="#4A2C2A" /> {/* Iris */}

      {/* Blush (Subtle pink) */}
      <rect x="9" y="18" width="2" height="1" fill="#FFC4C4" />
      <rect x="21" y="18" width="2" height="1" fill="#FFC4C4" />

      {/* Nose (Very subtle shadow) */}
      <rect x="15" y="19" width="1" height="1" fill="#E8CFC2" />

      {/* Lips */}
      <rect x="15" y="20" width="2" height="1" fill="#B55F5F" />

      {/* 5. Front Hair (Straight Bangs & Hime Cut Side Locks) */}
      {/* Bangs (Poni Lurus) */}
      <rect x="4" y="10" width="24" height="4" fill="#2C2124" />
      {/* Tiny strand gaps for texture at the bottom of the bangs */}
      <rect x="10" y="13" width="1" height="1" fill="#FDF1EB" />
      <rect x="15" y="13" width="2" height="1" fill="#FDF1EB" />
      <rect x="21" y="13" width="1" height="1" fill="#FDF1EB" />

      {/* Side Hair Framing the face */}
      {/* Left Side */}
      <rect x="4" y="14" width="5" height="18" fill="#2C2124" />
      <rect x="8" y="14" width="1" height="14" fill="#1D1417" /> {/* Inner Shadow */}
      <rect x="5" y="15" width="1" height="10" fill="#4A3B40" /> {/* Shine */}

      {/* Right Side */}
      <rect x="23" y="14" width="5" height="18" fill="#2C2124" />
      <rect x="23" y="14" width="1" height="14" fill="#1D1417" /> {/* Inner Shadow */}
      <rect x="26" y="15" width="1" height="10" fill="#4A3B40" /> {/* Shine */}

      {/* 6. Strawberry Hat (Topi Strawberry) */}
      {/* Stalk & Leaves */}
      <rect x="15" y="1" width="2" height="1" fill="#4A6B49" />
      <rect x="13" y="2" width="6" height="1" fill="#729C71" />
      <rect x="11" y="3" width="2" height="1" fill="#729C71" />
      <rect x="19" y="3" width="2" height="1" fill="#729C71" />

      {/* Hat Base (Red) */}
      <rect x="10" y="2" width="12" height="1" fill="#E23D50" />
      <rect x="8" y="3" width="16" height="1" fill="#E23D50" />
      <rect x="7" y="4" width="18" height="1" fill="#E23D50" />
      <rect x="6" y="5" width="20" height="1" fill="#E23D50" />
      <rect x="5" y="6" width="22" height="1" fill="#E23D50" />
      <rect x="4" y="7" width="24" height="2" fill="#E23D50" />

      {/* Hat Brim/Shadow (Dark Red, wrapping around the head) */}
      <rect x="3" y="9" width="26" height="2" fill="#B82434" />
      <rect x="2" y="11" width="28" height="1" fill="#B82434" />

      {/* Strawberry Seeds (White) scattered around the hat */}
      <rect x="11" y="4" width="1" height="1" fill="#FFFFFF" />
      <rect x="16" y="4" width="1" height="1" fill="#FFFFFF" />
      <rect x="20" y="5" width="1" height="1" fill="#FFFFFF" />
      <rect x="7" y="6" width="1" height="1" fill="#FFFFFF" />
      <rect x="13" y="7" width="1" height="1" fill="#FFFFFF" />
      <rect x="19" y="7" width="1" height="1" fill="#FFFFFF" />
      <rect x="25" y="6" width="1" height="1" fill="#FFFFFF" />
      <rect x="5" y="8" width="1" height="1" fill="#FFFFFF" />

    </svg>
  );
}

export default function AvatarStats() {
  const fullText = "Ini kumpulan racun Shopee ku + review ❤️. Silakan intip ya! ☕";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    // Array.from splits surrogate pairs better, but to be absolutely robust
    // we use slice and join so we don't rely on previous state accumulation
    const chars = [...fullText];
    let currentIndex = 0;
    
    setDisplayedText("");

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex <= chars.length) {
        setDisplayedText(chars.slice(0, currentIndex).join(""));
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full select-none">
      {/* Left Column: Avatar & Name */}
      <div className="flex flex-row md:flex-col items-center gap-3 flex-shrink-0 select-none">
        <div className="relative">
          <MerchantAvatar />
          <div className="absolute -top-0.5 -right-0.5 bg-strawberry-cherry text-white text-[7px] md:text-[8px] font-bold px-1 md:px-1.5 py-0.2 rounded-full border border-white select-none">
            Zia
          </div>
        </div>
        <div className="flex flex-col items-start md:items-center select-none">
          <h2 className="font-sans text-xs md:text-xs font-extrabold text-espresso-plum leading-none">
            @BerryPoisonPixel
          </h2>
          <span className="bg-[#FFF0EF] text-strawberry-cherry font-sans font-bold px-1.5 py-0.5 rounded-full text-[8px] md:text-[9px] text-center tracking-wider mt-1 md:mt-1.5 border border-[#FADCDA]">
            SHOPKEEPER
          </span>
        </div>
      </div>

      {/* Right Column: Dialog speech bubble */}
      <div className="flex-1 w-full relative">
        <div className="bg-white border border-[#4E3C44]/10 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm relative">
          {/* Bubble Pointer (left pointer for desktop, top pointer for mobile) */}
          <div className="hidden md:block absolute top-7 -left-1.5 w-3 h-3 bg-white border-b border-l border-[#4E3C44]/10 rotate-45 transform" />
          <div className="block md:hidden absolute -top-1.5 left-6 w-3 h-3 bg-white border-t border-l border-[#4E3C44]/10 rotate-45 transform" />

          <div className="flex items-center gap-1.5 mb-1 text-[8.5px] md:text-[9px] font-bold text-vintage-sage select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-vintage-sage animate-ping" />
            <span>HI! WELCOME</span>
          </div>

          <p className="font-sans text-[11px] md:text-sm text-espresso-plum font-semibold leading-relaxed">
            {displayedText}
            <span className="animate-pulse ml-0.5 text-strawberry-cherry">|</span>
          </p>
        </div>
      </div>
    </div>
  );
}
