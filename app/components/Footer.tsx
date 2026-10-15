"use client";

import React from "react";
import Link from "next/link";
import { Coffee, ArrowUp, Heart, Sparkles, MapPin, Phone, Mail } from "lucide-react";
import { CONFIG } from "../data/cafeData";
import { useCart } from "../context/CartContext";

export default function Footer() {
  const { setIsReservationOpen } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#24130A] text-[#FFF9F0] pt-16 sm:pt-20 pb-12 border-t border-[#FFF9F0]/10 relative overflow-hidden isolate">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#B8753D]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#FFF9F0]/15">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="#home"
              className="inline-flex items-center gap-2.5 font-serif font-bold text-2xl text-[#FFF9F0] tracking-tight mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D99352] to-[#B8753D] text-[#24130A] flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <span>{CONFIG.name}</span>
            </Link>

            <p className="text-xs sm:text-sm text-[#FFF9F0]/80 font-light leading-relaxed max-w-sm mb-6">
              Crafted with love, served with soul. Specialty single-origin coffees, morning viennoiserie, and a calming haven for conversation and focus.
            </p>

            <div className="space-y-2 text-xs text-[#FFF9F0]/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D99352]" />
                <span>{CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D99352]" />
                <a href={`tel:${CONFIG.phone}`} className="hover:text-[#D99352] transition-colors">
                  {CONFIG.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D99352]" />
                <a href={`mailto:${CONFIG.email}`} className="hover:text-[#D99352] transition-colors">
                  {CONFIG.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#FFF9F0] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FFF9F0]/75">
              <li>
                <a href="#home" className="hover:text-[#D99352] transition-colors">
                  Home Experience
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D99352] transition-colors">
                  Artisanal Menu
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#D99352] transition-colors">
                  Our Roasting Story
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D99352] transition-colors">
                  Signature Gallery
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#D99352] transition-colors">
                  Café Locations
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-[#D99352] transition-colors text-left font-medium text-[#D99352]"
                >
                  Reserve Table →
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#FFF9F0] mb-4">
              Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-[#FFF9F0]/75">
              {CONFIG.hours.map((h, i) => (
                <div key={i}>
                  <p className="text-[#D99352] font-semibold">{h.days}</p>
                  <p className="text-[#FFF9F0]/80 font-mono mt-0.5">{h.time}</p>
                </div>
              ))}
              <div className="pt-2 text-[11px] text-[#FFF9F0]/60 italic">
                Kitchen closes 30 mins before closing time
              </div>
            </div>
          </div>

          {/* Socials & Sustainability */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#FFF9F0] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#FFF9F0]/75 mb-6">
              {CONFIG.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D99352] transition-colors flex items-center gap-1.5"
                  >
                    <span>{s.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="p-3 rounded-2xl bg-[#FFF9F0]/5 border border-[#FFF9F0]/10 text-[11px] text-[#FFF9F0]/70">
              <span className="font-bold text-[#D99352] block mb-0.5">Eco Conscious</span>
              100% plant-based compostable takeaway cups & fair-trade beans.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F0]/60">
          <p>© 2026 Brewtoria Café & Bakery. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#D99352] fill-current" /> for coffee lovers
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF9F0]/10 hover:bg-[#D99352] hover:text-[#24130A] transition-all text-[#FFF9F0]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
