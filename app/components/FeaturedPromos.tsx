"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FeaturedPromos() {
  const { setSelectedCategory, setSearchQuery } = useCart();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery("");
    const menuEl = document.getElementById("menu");
    if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVisit = () => {
    const el = document.getElementById("visit");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
        {/* Promo 1: Signature Brews (Dark espresso theme) */}
        <article
          onClick={() => handleCategoryClick("coffee")}
          className="group relative min-h-[380px] sm:min-h-[420px] rounded-[32px] overflow-hidden p-8 sm:p-9 flex flex-col justify-between text-[#FFF9F0] isolate cursor-pointer shadow-[0_16px_36px_rgba(36,19,10,0.18)] hover:shadow-[0_24px_50px_rgba(36,19,10,0.28)] transition-all duration-500 hover:-translate-y-1.5"
        >
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src="/images/signature-brews.jpg"
              alt="Pouring Latte Art into ceramic coffee cup"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#140A04]/95 via-[#1E0F07]/60 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#140A04]/85 via-[#140A04]/40 to-transparent" />

          <div />

          <div>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#FFF9F0] leading-tight mb-2">
              Signature <br />
              Brews
            </h3>
            <p className="text-sm text-[#FFF9F0]/85 font-light leading-relaxed mb-6 max-w-[24ch]">
              Explore our handpicked specialty coffees.
            </p>
            <div className="inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm text-[#D99352] group-hover:text-[#FFF9F0] transition-colors">
              <span>View Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </article>

        {/* Promo 2: Freshly Baked (Warm cream theme) */}
        <article
          onClick={() => handleCategoryClick("snacks")}
          className="group relative min-h-[380px] sm:min-h-[420px] rounded-[32px] overflow-hidden p-8 sm:p-9 flex flex-col justify-between text-[#382014] isolate cursor-pointer shadow-[0_16px_36px_rgba(36,19,10,0.12)] hover:shadow-[0_24px_50px_rgba(36,19,10,0.22)] transition-all duration-500 hover:-translate-y-1.5 bg-[#F7EBDD]"
        >
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src="/images/fresh-bakery.jpg"
              alt="Freshly baked golden butter croissant on plate"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          {/* Subtle gradient overlay keeping text readable */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#F7EBDD]/95 via-[#F7EBDD]/70 to-[#F7EBDD]/20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F7EBDD]/95 via-[#F7EBDD]/60 to-transparent" />

          <div />

          <div>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#382014] leading-tight mb-2">
              Freshly <br />
              Baked
            </h3>
            <p className="text-sm text-[#382014]/85 font-light leading-relaxed mb-6 max-w-[24ch]">
              Delicious bites to complement your coffee.
            </p>
            <div className="inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm text-[#B8753D] group-hover:text-[#382014] transition-colors">
              <span>View Bakery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </article>

        {/* Promo 3: A Cozy Space for Everyone (Sunlit café with Visit Us button) */}
        <article
          onClick={scrollToVisit}
          className="group relative min-h-[380px] sm:min-h-[420px] rounded-[32px] overflow-hidden p-8 sm:p-9 flex flex-col justify-between text-[#FFF9F0] isolate cursor-pointer shadow-[0_16px_36px_rgba(36,19,10,0.18)] hover:shadow-[0_24px_50px_rgba(36,19,10,0.28)] transition-all duration-500 hover:-translate-y-1.5"
        >
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <Image
              src="/bgs/Golden Brewtoria Café Ambiance.png"
              alt="Warm Cozy Café Interior with Sunlight and Plants"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#140A04]/95 via-[#1E0F07]/50 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#140A04]/80 via-transparent to-transparent" />

          <div />

          <div>
            <h3 className="font-serif font-bold text-3xl sm:text-4xl text-[#FFF9F0] leading-tight mb-2">
              A Cozy Space <br />
              For Everyone
            </h3>
            <p className="text-sm text-[#FFF9F0]/85 font-light leading-relaxed mb-6 max-w-[28ch]">
              Work, meet or just relax. Our café is your happy place.
            </p>
            {/* Pill CTA button matching Reference Image */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E59850] text-[#24130A] font-bold text-xs sm:text-sm shadow-md group-hover:bg-[#FFF9F0] transition-colors">
              <span>Visit Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
