"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, Eye } from "lucide-react";
import { PRODUCTS, Product } from "../data/cafeData";
import { useCart } from "../context/CartContext";

export default function SignatureGallery() {
  const { addToCart, setQuickViewProduct } = useCart();
  const stripRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!stripRef.current) return;
    const amount = direction === "left" ? -340 : 340;
    stripRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header and Scroll Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#B8753D] block mb-2">
            Visual Highlights
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#382014]">
            Signature Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#8B7461] font-light mt-1">
            Handcrafted beverages and oven-warm pastries presented in exquisite detail.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll gallery left"
            className="w-11 h-11 rounded-full bg-[#FFF9F0] border border-[#382014]/15 hover:bg-[#E9D5BD] text-[#382014] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll gallery right"
            className="w-11 h-11 rounded-full bg-[#FFF9F0] border border-[#382014]/15 hover:bg-[#E9D5BD] text-[#382014] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Smooth Strip */}
      <div
        ref={stripRef}
        tabIndex={0}
        aria-label="Signature coffee products gallery"
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 no-scrollbar scroll-smooth"
      >
        {PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            onClick={() => setQuickViewProduct(prod)}
            className="flex-none snap-start w-[270px] sm:w-[290px] h-[360px] rounded-[32px] bg-gradient-to-b from-[#FFF9F0] to-[#E9D5BD]/40 border border-[#382014]/10 p-5 flex flex-col justify-between group cursor-pointer shadow-[0_12px_30px_rgba(56,32,20,0.06)] hover:shadow-[0_20px_45px_rgba(56,32,20,0.16)] transition-all duration-500 hover:-translate-y-2 relative"
          >
            {/* Top Category and Price Tag */}
            <div className="flex items-center justify-between text-xs font-semibold z-10">
              <span className="px-2.5 py-1 rounded-full bg-[#E9D5BD] text-[#B8753D]">
                {prod.badge || "Crafted"}
              </span>
              <span className="font-serif font-bold text-base text-[#382014]">
                ₹{prod.price}
              </span>
            </div>

            {/* Radiant Spotlight Pedestal & Product Render with public/bgs background */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden flex items-center justify-center my-auto border border-[#382014]/5 bg-[#E9D5BD]/30">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-700 ease-out group-hover:scale-110 filter saturate-110"
                style={{
                  backgroundImage: `url('${
                    prod.cats.includes("snacks") || prod.cats.includes("desserts")
                      ? "/bgs/Golden Brewtoria Café Ambiance.png"
                      : "/bgs/Warm Café Cream and Orange Hero Scene.png"
                  }')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F0]/80 via-transparent to-transparent" />
              <div className="relative w-36 h-36 flex items-center justify-center transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[-4deg] z-10">
                <Image
                  src={prod.image}
                  alt={prod.name}
                  width={240}
                  height={240}
                  className="w-full h-full object-contain filter drop-shadow-[0_18px_20px_rgba(56,32,20,0.3)]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Bottom Card Info & Quick Actions */}
            <div className="pt-3 border-t border-[#382014]/10 flex items-center justify-between z-10">
              <div>
                <h4 className="font-serif font-bold text-base text-[#382014] group-hover:text-[#B8753D] transition-colors leading-tight">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-[#8B7461] line-clamp-1 mt-0.5">
                  {prod.subtitle}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(prod.id);
                }}
                aria-label={`Add ${prod.name} to cart`}
                className="w-8 h-8 rounded-full bg-[#B8753D] hover:bg-[#D99352] text-[#FFF9F0] flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 group/btn"
              >
                <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90 duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
