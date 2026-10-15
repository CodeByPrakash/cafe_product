"use client";

import React from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#24130A] text-[#FFF9F0] border border-[#FFF9F0]/25 shadow-2xl backdrop-blur-xl">
        <div className="w-6 h-6 rounded-full bg-[#D99352] text-[#24130A] flex items-center justify-center flex-none">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span className="text-xs sm:text-sm font-medium pr-1">
          {toastMessage}
        </span>
        <button
          onClick={() => setIsCartOpen(true)}
          className="text-xs font-bold text-[#D99352] hover:text-[#FFF9F0] transition-colors underline ml-1"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}
