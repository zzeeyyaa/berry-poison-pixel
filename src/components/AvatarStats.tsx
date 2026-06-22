"use client";

import React from "react";

// Cute custom 16x16 pixel art shopkeeper SVG avatar
export function MerchantAvatar() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-11 h-11 md:w-18 md:h-18 bg-[#FFFDFD] p-0.5 select-none rounded-full border-2 border-[#4E3C44]"
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {/* Hair/Hood (Espresso Plum #4E3C44) */}
      <rect x="3" y="1" width="10" height="1" fill="#4E3C44" />
      <rect x="2" y="2" width="12" height="1" fill="#4E3C44" />
      <rect x="1" y="3" width="14" height="1" fill="#4E3C44" />
      <rect x="1" y="4" width="2" height="6" fill="#4E3C44" />
      <rect x="13" y="4" width="2" height="6" fill="#4E3C44" />

      {/* Hat Detail/Band (Retro Strawberry/Cherry #D9455B) */}
      <rect x="3" y="3" width="10" height="1" fill="#D9455B" />

      {/* Face (Warm Peach/Cream) */}
      <rect x="3" y="4" width="10" height="6" fill="#FCD7C6" />

      {/* Inner Hair/Bangs */}
      <rect x="3" y="4" width="1" height="2" fill="#4E3C44" />
      <rect x="4" y="4" width="8" height="1" fill="#4E3C44" />
      <rect x="12" y="4" width="1" height="2" fill="#4E3C44" />

      {/* Eyes (Espresso Plum #4E3C44) */}
      <rect x="5" y="6" width="1" height="1.5" fill="#4E3C44" />
      <rect x="10" y="6" width="1" height="1.5" fill="#4E3C44" />

      {/* Cheeks/Blush (Dusty Rose #E6C2BB) */}
      <rect x="4" y="8" width="2" height="1" fill="#E6C2BB" />
      <rect x="10" y="8" width="2" height="1" fill="#E6C2BB" />

      {/* Mouth (Espresso Plum) */}
      <rect x="7" y="8" width="2" height="1" fill="#4E3C44" />

      {/* Outfit/Collar (Vintage Sage #809F8C & Espresso) */}
      <rect x="3" y="10" width="10" height="4" fill="#809F8C" />
      <rect x="7" y="10" width="2" height="2" fill="#4E3C44" /> {/* Tie/Collar */}
      <rect x="2" y="11" width="1" height="3" fill="#809F8C" />
      <rect x="13" y="11" width="1" height="3" fill="#809F8C" />

      {/* Cape/Shoulders (Espresso Plum #4E3C44) */}
      <rect x="3" y="14" width="10" height="2" fill="#4E3C44" />
      <rect x="2" y="14" width="1" height="2" fill="#4E3C44" />
      <rect x="13" y="14" width="1" height="2" fill="#4E3C44" />
    </svg>
  );
}

export default function AvatarStats() {
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
          <h2 className="font-sans text-sm md:text-md font-extrabold text-espresso-plum leading-none">
            Zia @PoisonPixel
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
            {"\"Hai! Aku Zia. Di sini aku kumpulin barang racun Shopee terfavoritku. Silakan intip isi lemariku! ☕\""}
          </p>
        </div>
      </div>
    </div>
  );
}
