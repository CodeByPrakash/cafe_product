"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Search, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CONFIG } from "../data/cafeData";

export default function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["home", "menu", "story", "gallery", "visit", "contact"];
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Menu", href: "#menu", id: "menu" },
    { name: "Our Story", href: "#story", id: "story" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Locations", href: "#visit", id: "visit" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory("all");
      const menuEl = document.getElementById("menu");
      if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1320px,calc(100%-32px))] transition-all duration-300 rounded-full px-5 py-3 ${
          isScrolled
            ? "bg-[#FFF9F0]/95 backdrop-blur-2xl border border-[#382014]/20 shadow-[0_16px_40px_rgba(56,32,20,0.18)] text-[#24130A]"
            : "bg-[#1E0F07]/45 backdrop-blur-md border border-[#FFF9F0]/20 shadow-[0_16px_40px_rgba(0,0,0,0.25)] text-[#FFF9F0]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2.5 font-serif font-bold text-2xl tracking-tight group flex-none"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
              isScrolled ? "bg-[#B8753D]/12 text-[#B8753D]" : "bg-[#FFF9F0]/10 text-[#D99352]"
            }`}>
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M4 10h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3c0 1.5 1.5 1.5 1.5 3M12 3c0 1.5 1.5 1.5 1.5 3" />
              </svg>
            </div>
            <span
              className={`font-serif font-bold text-xl sm:text-2xl tracking-tight transition-colors duration-200 ${
                isScrolled ? "text-[#24130A]" : "text-[#FFF9F0]"
              }`}
            >
              {CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors duration-200 relative py-1 flex flex-col items-center group ${
                    isScrolled
                      ? isActive
                        ? "text-[#B8753D] font-bold"
                        : "text-[#382014] font-semibold hover:text-[#B8753D]"
                      : isActive
                      ? "text-[#FFF9F0] font-bold"
                      : "text-[#FFF9F0]/90 font-medium hover:text-[#D99352]"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-0.5 shadow-sm ${
                      isScrolled ? "bg-[#B8753D]" : "bg-[#D99352]"
                    }`} />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar: Search Pill, Cart Icon, Order Now Button */}
          <div className="flex items-center gap-3">
            {/* Search Pill Input matching Reference Image */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex items-center relative w-48 xl:w-56"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, food..."
                className={`w-full rounded-full py-2 pl-4 pr-9 text-xs font-sans transition-all outline-none border ${
                  isScrolled
                    ? "bg-[#E9D5BD]/40 border-[#382014]/20 text-[#24130A] placeholder-[#8B7461] focus:border-[#B8753D] focus:bg-[#FFF9F0]"
                    : "bg-[#FFF9F0]/20 border-[#FFF9F0]/30 text-[#FFF9F0] placeholder-[#FFF9F0]/70 focus:border-[#D99352] backdrop-blur-md"
                }`}
              />
              <button
                type="submit"
                aria-label="Submit search"
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-opacity ${
                  isScrolled ? "text-[#382014] opacity-80 hover:opacity-100" : "text-[#FFF9F0] opacity-75 hover:opacity-100"
                }`}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Shopping Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className={`w-10 h-10 rounded-full flex items-center justify-center relative transition-all duration-200 hover:scale-105 border ${
                isScrolled
                  ? "bg-[#E9D5BD]/40 border-[#382014]/15 text-[#24130A] hover:bg-[#E9D5BD]/70"
                  : "bg-[#FFF9F0]/15 border-[#FFF9F0]/25 text-[#FFF9F0] hover:bg-[#FFF9F0]/25"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] font-bold text-[11px] min-w-[19px] h-[19px] rounded-full flex items-center justify-center px-1 shadow-md border border-[#FFF9F0]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA Button matching Reference Image */}
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-[#B8753D] to-[#D99352] hover:from-[#A66332] hover:to-[#C87E3E] text-[#FFF9F0] shadow-[0_4px_16px_rgba(184,117,61,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border ${
                isScrolled
                  ? "bg-[#E9D5BD]/40 border-[#382014]/15 text-[#24130A]"
                  : "bg-[#FFF9F0]/15 border-[#FFF9F0]/25 text-[#FFF9F0]"
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-50 bg-[#24130A]/80 backdrop-blur-lg transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-[min(340px,85vw)] bg-gradient-to-b from-[#24130A] to-[#382014] text-[#FFF9F0] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-400 ease-out border-l border-[#FFF9F0]/15 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#FFF9F0]/10">
              <div className="flex items-center gap-2.5 font-serif font-bold text-xl">
                <Coffee className="w-6 h-6 text-[#D99352]" />
                <span>{CONFIG.name}</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#FFF9F0]/10 flex items-center justify-center text-[#FFF9F0] hover:bg-[#FFF9F0]/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl font-medium text-[#FFF9F0] hover:text-[#D99352] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#D99352]" />
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#FFF9F0]/10">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full font-bold text-sm bg-[#8E5329] text-[#FFF9F0] flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
