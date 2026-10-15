"use client";

import React from "react";
import { CheckCircle2, Coffee, Clock, MapPin, Sparkles, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { PRODUCTS, CONFIG } from "../data/cafeData";

export default function OrderConfirmationModal() {
  const { placedOrderNumber, setPlacedOrderNumber, cart, clearCart } = useCart();

  if (!placedOrderNumber) return null;

  const handleFinish = () => {
    clearCart();
    setPlacedOrderNumber(null);
  };

  const orderItems = Object.entries(cart).map(([id, qty]) => ({
    item: PRODUCTS.find((p) => p.id === id),
    qty,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#140A04]/80 backdrop-blur-md transition-opacity"
        onClick={handleFinish}
      />

      {/* Confirmation Modal */}
      <div className="relative w-full max-w-md rounded-[36px] bg-[#FFF9F0] border border-[#382014]/15 shadow-2xl p-6 sm:p-8 text-[#382014] z-10 text-center animate-gentle-bob">
        <button
          onClick={handleFinish}
          aria-label="Close confirmation"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#382014]/5 hover:bg-[#382014]/10 text-[#382014] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto mb-4 shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B8753D] block mb-1">
          Order Confirmed · {placedOrderNumber}
        </span>

        <h3 className="font-serif font-bold text-2xl text-[#382014] mb-2">
          Your Brew Is In Good Hands!
        </h3>

        <p className="text-xs sm:text-sm text-[#8B7461] font-light mb-6">
          Our baristas have received your ticket and are grinding fresh beans and warming your bakes right now.
        </p>

        {/* Pickup Details Box */}
        <div className="p-4 rounded-2xl bg-[#E9D5BD]/40 border border-[#382014]/10 text-left text-xs text-[#382014] space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#B8753D]" />
            <span>
              Estimated Ready Time: <strong>12 – 15 Minutes</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#B8753D]" />
            <span>Pickup: {CONFIG.address}</span>
          </div>
        </div>

        {/* Ordered Items Preview */}
        {orderItems.length > 0 && (
          <div className="max-h-36 overflow-y-auto mb-6 text-left border-y border-[#382014]/10 py-3 space-y-2 text-xs">
            {orderItems.map(
              ({ item, qty }) =>
                item && (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="font-medium text-[#382014]">
                      {qty}x {item.name}
                    </span>
                    <span className="font-mono text-[#8B7461]">
                      ₹{item.price * qty}
                    </span>
                  </div>
                )
            )}
          </div>
        )}

        <button
          onClick={handleFinish}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01]"
        >
          Awesome, Thanks!
        </button>
      </div>
    </div>
  );
}
