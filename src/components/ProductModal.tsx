"use client";

import React, { useEffect } from "react";
import { Product } from "@/src/types/product";
import { ItemIcon } from "../utils/pixelArt/GenerateIconPixel";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <div
      className="fixed inset-0 bg-[#4E3C44]/45 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-5 shadow-xl max-w-sm w-full border border-[#4E3C44]/10 relative animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#4E3C44]/40 hover:text-[#4E3C44] text-xs font-bold bg-[#FAF5F2] hover:bg-[#FFF0EF] w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer select-none"
          title="Tutup detail"
        >
          ✕
        </button>

        {/* Modal Header Tags */}
        <div className="flex items-center gap-2 mb-3 select-none">
          <span className="font-sans text-[10px] font-bold uppercase bg-[#F3E2DC] text-[#4E3C44] px-2.5 py-0.5 rounded-full border border-espresso-plum/10">
            {product.category}
          </span>
        </div>

        {/* Large Visual Thumbnail box */}
        <div className="flex justify-center items-center bg-[#FCF8F7] border border-[#4E3C44]/5 rounded-xl mb-4 select-none overflow-hidden relative h-[140px]">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <div className="transform scale-125">
              <ItemIcon type={product.iconType} />
            </div>
          )}
        </div>

        {/* Product Meta */}
        <div className="flex flex-col gap-1">
          <h2 className="font-sans font-black text-base text-espresso-plum leading-snug">
            {product.name}
          </h2>

          {/* Stat Boost */}
          <div className="flex items-center gap-1.5 text-xs text-espresso-plum/70 select-none">
            <span className="text-[#D9455B] font-bold">✦</span>
            <span className="text-vintage-sage font-bold text-[10px]">{product.statBoost}</span>
          </div>
        </div>



        {/* Zia's Full Uncut Review bubble */}
        <div className="bg-[#FAF4F2] border border-[#4E3C44]/5 rounded-xl p-3 my-3 text-xs text-espresso-plum font-semibold relative leading-relaxed shadow-sm">
          <span className="text-strawberry-cherry text-[9px] font-extrabold block mb-1 uppercase tracking-wider select-none">
            💬 Detail Review:
          </span>
          {"\""}{product.dialogText}{"\""}
        </div>

        {/* Pricing & Footer Actions */}
        <div className="mt-4 pt-3 border-t border-[#4E3C44]/8 flex items-center justify-between gap-2">
          <div className="flex flex-col select-none truncate pr-2">
            <span className="font-sans text-base font-extrabold text-[#D9455B] leading-none">
              {formatIDR(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {product.videoLink && (
              <a
                href={product.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="modern-btn bg-[#4E3C44] text-[#F3E2DC] border border-[#F3E2DC]/10 shadow-sm hover:bg-[#5E4C54] hover:text-white hover:border-white/20 tracking-wide uppercase px-3 py-2 font-bold cursor-pointer text-center flex items-center justify-center transition-all"
                title="Tonton Video"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </a>
            )}
            <a
              href={product.shopeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="modern-btn modern-btn-cherry tracking-wide uppercase px-5 py-2 font-bold cursor-pointer text-center inline-block"
            >
              BELI DI SHOPEE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
