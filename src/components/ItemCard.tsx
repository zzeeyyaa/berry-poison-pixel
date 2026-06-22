"use client";

import React from "react";
import { Product } from "@/src/types/product";
import { ItemIcon } from "../utils/pixelArt/GenerateIconPixel";


interface ItemCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export default function ItemCard({ product, onOpenDetail }: ItemCardProps) {
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(num);
  };

  // Truncate review if it's too long
  const isLongReview = product.dialogText.length > 55;
  const truncatedReview = isLongReview
    ? `${product.dialogText.substring(0, 52)}...`
    : product.dialogText;

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="modern-card p-2 flex flex-col justify-between h-full cursor-pointer hover:border-[#D9455B]/20"
    >
      <div>
        {/* Label Tags (Top) */}
        <div className="flex justify-between items-center gap-2 mb-1 select-none">
          <span className="font-sans text-[8.5px] font-bold uppercase bg-[#F3E2DC] text-[#4E3C44] px-1.5 py-0.5 rounded-full border border-espresso-plum/10">
            {product.category}
          </span>
        </div>

        {/* Visual Image/Art Panel */}
        <div className="flex justify-center items-center bg-[#FCF8F7] border border-[#4E3C44]/5 rounded-lg mb-1 select-none overflow-hidden h-[88px] relative">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <ItemIcon type={product.iconType} className="w-9 h-9" />
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-0.5">
          {/* Title */}
          <h3 className="font-sans font-extrabold text-[11px] text-espresso-plum leading-tight line-clamp-2 hover:text-strawberry-cherry transition-colors min-h-[26px]">
            {product.name}
          </h3>

          {/* Stat Boost (Removed Rating and Sales count) */}
          <div className="flex items-center gap-1 text-xs text-espresso-plum/70 select-none">
            <span className="text-[#D9455B] font-bold">✦</span>
            <span className="text-vintage-sage font-bold text-[8.5px]">{product.statBoost.split(",")[0]}</span>
          </div>

          {/* Inline NPC Dialogue Bubble */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
            className="bg-[#FAF4F2] border border-[#4E3C44]/5 rounded-lg p-1 py-1 my-0.5 text-[9.5px] text-espresso-plum font-semibold relative leading-relaxed hover:bg-[#FFF0EF] transition-colors cursor-pointer select-none"
            title="Klik untuk lihat ulasan lengkap"
          >
            <span className="text-strawberry-cherry text-[8.5px] font-extrabold block mb-0.5 uppercase tracking-wider select-none">💬 REVIEW:</span>
            {"\""}{truncatedReview}{"\""}
            {isLongReview && (
              <span className="text-strawberry-cherry font-extrabold text-[8.5px] ml-1 hover:underline">
                [Selengkapnya]
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing and Button Actions (Bottom) */}
      <div className="mt-1 pt-1 border-t border-dashed border-espresso-plum/10">
        <div className="flex items-center justify-between gap-1">
          <div className="flex flex-col select-none">
            <span className="font-sans text-[13px] font-extrabold text-[#D9455B] leading-none">
              {formatIDR(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {product.videoLink && (
              <a
                href={product.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="modern-btn modern-btn-espresso w-6 h-6 p-0 flex items-center justify-center rounded-full hover:scale-110 active:scale-90 transition-all cursor-pointer select-none bg-[#4E3C44] text-white shadow-[0_2px_0_#2B2125] hover:bg-[#D9455B] hover:shadow-[0_2px_0_#9C3040]"
                title="Tonton Video"
              >
                <svg
                  viewBox="0 0 8 8"
                  className="w-2.5 h-2.5 fill-white flex-shrink-0"
                  style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
                >
                  <path d="M2.5 1.5 L2.5 6.5 L6.5 4 Z" />
                </svg>
              </a>
            )}
            <a
              href={product.shopeeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="modern-btn modern-btn-cherry w-6 h-6 p-0 flex items-center justify-center rounded-full hover:scale-110 active:scale-90 transition-all cursor-pointer select-none"
              title="Beli di Shopee"
            >
              <svg
                viewBox="0 0 8 8"
                className="w-2.5 h-2.5 fill-white flex-shrink-0"
                style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
              >
                <rect x="2" y="3" width="3" height="2" />
                <rect x="5" y="2" width="1" height="4" />
                <rect x="6" y="3" width="1" height="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
