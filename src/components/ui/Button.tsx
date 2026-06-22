import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cherry" | "espresso" | "white";
  children: React.ReactNode;
}

export function Button({ variant = "cherry", children, className = "", ...props }: ButtonProps) {
  const baseStyle = "flex-shrink-0 category-tab-btn transition-all cursor-pointer py-1.5 px-4 text-xs font-bold font-sans flex items-center justify-center gap-1.5 rounded-full select-none hover:scale-105 active:scale-95";

  const variantStyles = {
    cherry: "category-tab-btn-cherry text-white bg-[#D9455B] hover:bg-[#c1374a]",
    espresso: "category-tab-btn-espresso text-[#4E3C44]/70 hover:text-[#4E3C44] bg-[#F3E2DC]/30 hover:bg-[#F3E2DC]/60",
    white: "modern-btn-white bg-white border border-[#4E3C44]/10 text-[#4E3C44] hover:bg-[#FCF8F7]",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
