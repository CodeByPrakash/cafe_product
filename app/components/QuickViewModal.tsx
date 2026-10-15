"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, Plus, Minus, ShoppingBag, Sparkles, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [milkOption, setMilkOption] = useState("Whole Milk");
  const [sweetness, setSweetness] = useState("Regular Sweet");

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct.id, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#140A04]/70 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-[36px] bg-[#FFF9F0] border border-[#382014]/15 shadow-2xl p-6 sm:p-8 text-[#382014] z-10 max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close product preview"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#382014]/5 hover:bg-[#382014]/10 text-[#382014] flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image Stage with public/bgs background */}
          <div className="relative w-full h-64 sm:h-80 rounded-3xl bg-[#E9D5BD]/40 flex items-center justify-center p-6 border border-[#382014]/10 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-45 filter saturate-115"
              style={{
                backgroundImage: `url('${
                  quickViewProduct.cats.includes("snacks") || quickViewProduct.cats.includes("desserts")
                    ? "/bgs/Golden Brewtoria Café Ambiance.png"
                    : "/bgs/Warm Café Cream and Orange Hero Scene.png"
                }')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F0]/80 via-transparent to-transparent" />
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center z-10">
              <Image
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                width={320}
                height={320}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_24px_rgba(56,32,20,0.35)]"
              />
            </div>
          </div>

          {/* Product Details & Customizations */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {quickViewProduct.badge && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#B8753D] text-[#FFF9F0]">
                  {quickViewProduct.badge}
                </span>
              )}
              <div className="flex items-center gap-1 text-[#B8753D] text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{quickViewProduct.rating}</span>
              </div>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#382014] leading-tight">
              {quickViewProduct.name}
            </h3>
            <p className="text-xs text-[#8B7461] mt-1 font-light">
              {quickViewProduct.subtitle}
            </p>

            <span className="font-serif font-bold text-2xl text-[#B8753D] block my-3">
              ₹{quickViewProduct.price}
            </span>

            <p className="text-xs text-[#382014]/85 leading-relaxed font-light mb-4">
              {quickViewProduct.desc}
            </p>

            {/* Ingredients & Prep */}
            {quickViewProduct.ingredients && (
              <div className="p-3 rounded-xl bg-[#E9D5BD]/30 border border-[#382014]/5 text-[11px] text-[#8B7461] mb-4">
                <strong className="text-[#382014] block mb-0.5">Ingredients & Roast:</strong>
                {quickViewProduct.ingredients}
              </div>
            )}

            {/* Customization Options */}
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#382014] block mb-1">
                  Milk Preference
                </span>
                <div className="flex gap-2">
                  {["Whole Milk", "Oat Milk (+₹20)", "Almond Milk"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilkOption(m)}
                      className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                        milkOption === m
                          ? "bg-[#382014] text-[#FFF9F0] border-[#382014] font-semibold"
                          : "bg-[#FFF9F0] text-[#382014] border-[#382014]/15 hover:bg-[#E9D5BD]/40"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#382014] block mb-1">
                  Sweetness
                </span>
                <div className="flex gap-2">
                  {["Regular Sweet", "Less Sweet", "No Sugar"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSweetness(s)}
                      className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                        sweetness === s
                          ? "bg-[#382014] text-[#FFF9F0] border-[#382014] font-semibold"
                          : "bg-[#FFF9F0] text-[#382014] border-[#382014]/15 hover:bg-[#E9D5BD]/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#E9D5BD]/60 rounded-full p-1 border border-[#382014]/10">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full bg-[#FFF9F0] text-[#382014] flex items-center justify-center font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-sm min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full bg-[#B8753D] text-[#FFF9F0] flex items-center justify-center font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-6 rounded-full font-bold text-sm bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add · ₹{quickViewProduct.price * quantity}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
