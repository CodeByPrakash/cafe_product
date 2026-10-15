"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  MapPin,
  Coffee,
  Wifi,
  Calendar,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export interface HeroStageItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  image: string;
  headline: string;
  subhead?: string;
  description: string;
  accentColor: string;
  tag: string;
}

const HERO_STAGES: HeroStageItem[] = [
  {
    id: "latte",
    name: "Iced Caramel Latte",
    subtitle: "Artisanal Cold Extraction",
    category: "Signature Coffee",
    price: 160,
    image: "/items/Caramel Coffee Splash with Whipped Cream.png",
    headline: "CARAMEL LATTE",
    description:
      "Crafted with hand-pulled espresso, artisanal vanilla-bean caramel splash, and a luscious cloud of sweet dairy whip.",
    accentColor: "#D99352",
    tag: "01 / 04 • SIGNATURE BREW",
  },
  {
    id: "brownie",
    name: "Choco Brownie Explosion",
    subtitle: "Warm Belgian Fudge",
    category: "Fresh Bakery",
    price: 120,
    image: "/items/Decadent Chocolate Brownie Explosion.png",
    headline: "CHOCO BROWNIE",
    description:
      "Decadent Belgian 70% dark chocolate brownie with a crisp roasted top, molten truffle core, and warm cocoa drizzle.",
    accentColor: "#B8753D",
    tag: "02 / 04 • BAKERY SPECIALTY",
  },
  {
    id: "croissant",
    name: "Flaky Butter Croissant",
    subtitle: "French Laminated Pastry",
    category: "Artisanal Bakes",
    price: 90,
    image: "/items/Golden Flaky Croissant with Floating Crumbs.png",
    headline: "BUTTER CROISSANT",
    description:
      "Slow-fermented French pastry baked to a deep golden amber. Shattering crisp exterior with an airy, cloud-like center.",
    accentColor: "#D99352",
    tag: "03 / 04 • PARISIAN CLASSIC",
  },
  {
    id: "straw",
    name: "Strawberry Milkshake Delight",
    subtitle: "Hand-Blended Berry Splash",
    category: "Chilled Frappé",
    price: 140,
    image: "/items/Strawberry Milkshake Splash Delight.png",
    headline: "BERRY DELIGHT",
    description:
      "Fresh mountain strawberries crushed with velvety Madagascar vanilla cream, crowned with a vibrant ruby berry splash.",
    accentColor: "#E07A5F",
    tag: "04 / 04 • SUMMER CRUSH",
  },
];

export interface FinaleSticker {
  id: string;
  name: string;
  price: number;
  tag: string;
  image: string;
  pos: string;
  size: string;
  rotation: number;
  delay: string;
}

const FINALE_STICKERS: FinaleSticker[] = [
  {
    id: "latte",
    name: "Iced Caramel Latte",
    price: 160,
    tag: "☕ Cold Drip",
    image: "/items/Caramel Coffee Splash with Whipped Cream.png",
    pos: "top-[9%] left-[6%] sm:left-[8%]",
    size: "w-32 sm:w-40 md:w-48 lg:w-56 h-40 sm:h-50 md:h-60 lg:h-68",
    rotation: -8,
    delay: "0s",
  },
  {
    id: "brownie",
    name: "Choco Brownie",
    price: 120,
    tag: "🍫 Lava Fudge",
    image: "/items/Decadent Chocolate Brownie Explosion.png",
    pos: "top-[10%] right-[6%] sm:right-[8%]",
    size: "w-32 sm:w-40 md:w-48 lg:w-56 h-40 sm:h-50 md:h-60 lg:h-68",
    rotation: 8,
    delay: "0.2s",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    price: 90,
    tag: "🥐 72 Layers",
    image: "/items/Golden Flaky Croissant with Floating Crumbs.png",
    pos: "top-[44%] left-[4%] sm:left-[7%]",
    size: "w-30 sm:w-38 md:w-46 lg:w-52 h-34 sm:h-44 md:h-52 lg:h-60",
    rotation: 9,
    delay: "0.4s",
  },
  {
    id: "straw",
    name: "Strawberry Shake",
    price: 140,
    tag: "🍓 Berry Splash",
    image: "/items/Strawberry Milkshake Splash Delight.png",
    pos: "top-[42%] right-[4%] sm:right-[7%]",
    size: "w-32 sm:w-40 md:w-48 lg:w-56 h-40 sm:h-50 md:h-60 lg:h-68",
    rotation: -9,
    delay: "0.6s",
  },
  {
    id: "matcha",
    name: "Matcha Frappé",
    price: 170,
    tag: "🍵 Uji Matcha",
    image: "/items/Dynamic Matcha Frappé Splash.png",
    pos: "top-[6%] left-[24%] sm:left-[27%]",
    size: "w-28 sm:w-34 md:w-42 lg:w-48 h-32 sm:h-42 md:h-50 lg:h-58",
    rotation: -12,
    delay: "0.3s",
  },
  {
    id: "crumb_croissant",
    name: "Almond Flake",
    price: 130,
    tag: "✨ Toasted Almond",
    image: "/items/Golden Croissant Crumb Explosion.png",
    pos: "top-[7%] right-[24%] sm:right-[27%]",
    size: "w-28 sm:w-34 md:w-42 lg:w-48 h-32 sm:h-42 md:h-50 lg:h-58",
    rotation: 12,
    delay: "0.5s",
  },
  {
    id: "cup",
    name: "Steaming Latte",
    price: 140,
    tag: "☕ Hot Roast",
    image: "/items/Steaming Latte with Coffee Splash.png",
    pos: "bottom-[9%] left-[8%] sm:left-[11%]",
    size: "w-30 sm:w-38 md:w-46 lg:w-52 h-34 sm:h-42 md:h-50 lg:h-58",
    rotation: -6,
    delay: "0.7s",
  },
  {
    id: "oreo",
    name: "Cookie Mocha",
    price: 180,
    tag: "🍪 Roasted Cocoa",
    image: "/items/Chocolate Frappe Splash with Coffee Beans.png",
    pos: "bottom-[9%] right-[8%] sm:right-[11%]",
    size: "w-32 sm:w-40 md:w-48 lg:w-54 h-36 sm:h-46 md:h-54 lg:h-62",
    rotation: 7,
    delay: "0.8s",
  },
];

export default function Hero3DShowcase({
  onOpenStoryModal,
}: {
  onOpenStoryModal: () => void;
}) {
  const { addToCart, setIsReservationOpen } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Scroll tracking state
  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Update scroll progress with Lenis or native window scroll
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const currentScrolled = -rect.top;
      const raw = Math.max(0, Math.min(1, currentScrolled / (totalScrollable || 1)));
      targetProgress.current = raw;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const loop = () => {
      // Smooth linear interpolation for video scrub effect
      smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.12;
      const rounded = Math.round(smoothProgress.current * 1000) / 1000;
      setCurrentProgress(rounded);

      // Determine active stage index (4 stages + 1 finale)
      let stage = Math.min(3, Math.floor(rounded / 0.24));
      if (rounded >= 0.85) stage = 4;
      setActiveStageIndex(stage);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mouse parallax interaction
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!stickyRef.current) return;
    const rect = stickyRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseCoords({ x, y });
  }, []);

  // Jump to specific stage
  const scrollToStage = (stageIdx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScroll = container.offsetTop + totalScrollable * (stageIdx * 0.245);

    // If Lenis is active on window, use it for buttery smooth jump
    const lenis = (window as unknown as { __lenisInstance?: { scrollTo: (y: number, opts?: object) => void } }).__lenisInstance;
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handleNudge = (direction: "left" | "right") => {
    const nextIdx =
      direction === "left"
        ? Math.max(0, activeStageIndex - 1)
        : Math.min(4, activeStageIndex + 1);
    scrollToStage(nextIdx);
  };

  // Safe active stage item
  const activeItem = HERO_STAGES[Math.min(3, activeStageIndex)] || HERO_STAGES[0];
  const isFinale = activeStageIndex >= 4 || currentProgress >= 0.84;

  // Shared renderer for the 3D Depth Typography Sandwich (Zero displacement between solid & stroke)
  const renderSandwichTypography = (isForegroundOutline: boolean) => {
    const headlineText = isFinale ? "BREWTORIA" : activeItem.headline;
    const subheadText = isFinale
      ? "ARTISANAL SPECIALTY COFFEE & FRENCH BAKERY"
      : activeItem.subhead || "";

    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden px-4 sm:px-8 ${
          isForegroundOutline ? "z-[28]" : "z-[8]"
        }`}
      >
        <div
          className={`flex flex-col items-center justify-center text-center transition-transform duration-500 ease-out max-w-full ${
            isFinale && !isForegroundOutline ? "opacity-15 scale-90" : "opacity-100 scale-100"
          }`}
          style={{
            transform: `translate3d(${mouseCoords.x * -24}px, ${mouseCoords.y * -16}px, 0)`,
          }}
        >
          <span
            className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.8rem] 2xl:text-[7.6rem] leading-[0.92] tracking-normal uppercase whitespace-nowrap select-none max-w-full"
            style={
              isForegroundOutline
                ? {
                    color: "transparent",
                    WebkitTextStroke: "2px #FFF9F0",
                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.7))",
                  }
                : {
                    color: "rgba(255, 249, 240, 0.94)",
                    filter: "drop-shadow(0 10px 32px rgba(0,0,0,0.55))",
                  }
            }
          >
            {headlineText}
          </span>
          {subheadText && (
            <span
              className="font-sans font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base tracking-[0.3em] uppercase mt-2.5 sm:mt-4 whitespace-nowrap select-none opacity-90"
              style={
                isForegroundOutline
                  ? {
                      color: "transparent",
                      WebkitTextStroke: "1px #D99352",
                    }
                  : {
                      color: "#D99352",
                    }
              }
            >
              {subheadText}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full h-[400vh] bg-[#1E0F07] selection:bg-[#B8753D] selection:text-[#FFF9F0]"
    >
      {/* STICKY VIEWPORT CONTAINER */}
      <div
        ref={stickyRef}
        onMouseMove={handleMouseMove}
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-between isolate px-4 sm:px-8 md:px-14 lg:px-16"
      >
        {/* BACKGROUND 1: Luxury Dreamy Café Interior */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-[-4%] bg-cover bg-center opacity-30 filter blur-[3px] saturate-125 scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: "url('/bgs/hero-cafe-bg.jpg')",
              transform: `scale(${1.05 + currentProgress * 0.08}) translate3d(${mouseCoords.x * -16}px, ${mouseCoords.y * -14}px, 0)`,
            }}
          />
          {/* Radial Warm Glows matching Reference Ambience */}
          <div className="absolute -top-[20%] -left-[10%] w-[68vw] h-[68vw] rounded-full bg-gradient-to-br from-[#D99352]/25 to-transparent blur-[120px]" />
          <div className="absolute -bottom-[20%] right-[5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-[#B8753D]/30 via-[#382014]/40 to-transparent blur-[140px]" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1E0F07]/50 to-[#1E0F07]/90" />
        </div>

        {/* NEON GLOWING LIGHT RINGS (matching Reference Image) */}
        <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] pointer-events-none z-[4] opacity-75">
          <svg viewBox="0 0 600 600" className="w-full h-full animate-slow-rotate">
            <circle
              cx="300"
              cy="300"
              r="220"
              stroke="url(#heroNeonGlow)"
              strokeWidth="2.5"
              strokeDasharray="9 16"
              fill="none"
              className="filter drop-shadow-[0_0_16px_rgba(217,147,82,0.85)]"
            />
            <ellipse
              cx="300"
              cy="300"
              rx="250"
              ry="190"
              stroke="#FFF9F0"
              strokeWidth="1.2"
              transform="rotate(18 300 300)"
              opacity="0.6"
              fill="none"
              className="filter drop-shadow-[0_0_10px_rgba(255,249,240,0.6)]"
            />
            <defs>
              <linearGradient id="heroNeonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D99352" stopOpacity="0.1" />
                <stop offset="45%" stopColor="#FFF9F0" stopOpacity="1" />
                <stop offset="65%" stopColor="#D99352" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#B8753D" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* SIGNATURE 3D DEPTH TYPOGRAPHY SANDWICH:                                 */}
        {/* Layer 1: Solid Cream Filled Text (BEHIND product image, z-[8])           */}
        {/* ========================================================================= */}
        {renderSandwichTypography(false)}

        {/* ========================================================================= */}
        {/* STAGES 0-3: 1-BY-1 POP-UP 3D PRODUCTS (MIDDLE LAYER, z-[18])              */}
        {/* ========================================================================= */}
        {!isFinale && (
          <div className="absolute inset-0 pointer-events-none z-[18] overflow-hidden flex items-center justify-center">
            {HERO_STAGES.map((stage, idx) => {
              const stageCenter = idx * 0.24;
              const distFromCenter = Math.abs(currentProgress - stageCenter);

              const isCurrent = activeStageIndex === idx;
              const opacity = Math.max(0, 1 - distFromCenter * 5.5);
              const scale = Math.max(0.62, 0.98 - distFromCenter * 1.55);
              const translateY = (currentProgress - stageCenter) * -350;
              const rotate = (idx % 2 === 0 ? -4 : 5) + (currentProgress - stageCenter) * 20;

              if (opacity <= 0.01) return null;

              return (
                <div
                  key={stage.id}
                  className="absolute left-1/2 top-[46%] sm:top-[45%] -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-auto"
                  style={{
                    opacity,
                    transform: `translate3d(${mouseCoords.x * 28}px, ${translateY + mouseCoords.y * 20}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                    transition: "opacity 0.2s ease-out",
                  }}
                >
                  <div className="relative w-[310px] h-[410px] sm:w-[390px] sm:h-[510px] md:w-[475px] md:h-[610px] lg:w-[580px] lg:h-[715px] xl:w-[645px] xl:h-[780px] flex items-center justify-center group cursor-pointer">
                    {/* High-res Splash Cutout (Physically overlaps the big typography behind it) */}
                    <Image
                      src={stage.image}
                      alt={stage.name}
                      width={860}
                      height={1040}
                      priority={idx === 0}
                      className="w-auto h-full max-h-full object-contain filter drop-shadow-[0_40px_70px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                    />

                    {/* Attached Frosted Glass Product Card (matching Reference Image) */}
                    {isCurrent && (
                      <div className="absolute -bottom-2 sm:bottom-4 right-2 sm:right-8 z-40 min-w-[200px] sm:min-w-[230px] px-4 py-3 rounded-2xl backdrop-blur-2xl border border-[#FFF9F0]/40 shadow-[0_20px_45px_rgba(0,0,0,0.45)] bg-[#FFF9F0]/22 hover:bg-[#FFF9F0]/32 transition-all duration-300 pointer-events-auto group-hover:scale-105">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D99352] block">
                              {stage.category}
                            </span>
                            <h4 className="font-serif font-bold text-sm sm:text-base text-[#FFF9F0] leading-snug drop-shadow-sm mt-0.5">
                              {stage.name}
                            </h4>
                            <span className="font-sans font-bold text-sm text-[#FFF9F0] mt-1 block">
                              ₹ {stage.price}
                            </span>
                          </div>

                          {/* Circular Add Button with '+' */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(stage.id);
                            }}
                            aria-label={`Add ${stage.name} to cart`}
                            className="w-9 h-9 flex-none rounded-full bg-[#8E5329] hover:bg-[#A66332] text-[#FFF9F0] flex items-center justify-center font-bold shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
                          >
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* STAGE 4 (FINALE): SPACIOUS STICKER SHOWCASE & CENTER CAFÉ ABOUT HUB       */}
        {/* ========================================================================= */}
        {isFinale && (
          <div className="absolute inset-0 pointer-events-none z-[22] overflow-hidden flex items-center justify-center animate-fade-in">
            {/* CENTER: Editorial Text About the Café and Basic Details */}
            <div className="relative z-30 max-w-2xl mx-auto px-4 text-center pointer-events-auto">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF9F0]/15 border border-[#FFF9F0]/30 text-[#FFF9F0] text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#D99352]" />
                <span>WELCOME TO BREWTORIA CAFÉ</span>
              </div>

              {/* Central Headline */}
              <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-[#FFF9F0] leading-[1.08] tracking-tight mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
                Crafted With Soul, <br />
                Brewed For Connection
              </h2>

              {/* Warm Story & Philosophy */}
              <p className="text-xs sm:text-sm md:text-base text-[#FFF9F0]/90 font-light leading-relaxed max-w-xl mx-auto mb-5 drop-shadow-sm">
                A warm European-inspired sanctuary where slow-drip single-origin roasts meet morning-baked French pastry traditions. Take a seat, breathe in the roasted caramel aroma, and make yourself at home.
              </p>

              {/* 4 Essential Café Detail Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-xl mx-auto mb-6">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFF9F0]/12 backdrop-blur-md border border-[#FFF9F0]/20 flex flex-col items-center text-center shadow-md">
                  <Clock className="w-4 h-4 text-[#D99352] mb-1" />
                  <span className="text-[10px] uppercase font-bold text-[#D99352]">Hours</span>
                  <span className="text-xs font-semibold text-[#FFF9F0] mt-0.5">7 AM – 11 PM</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFF9F0]/12 backdrop-blur-md border border-[#FFF9F0]/20 flex flex-col items-center text-center shadow-md">
                  <MapPin className="w-4 h-4 text-[#D99352] mb-1" />
                  <span className="text-[10px] uppercase font-bold text-[#D99352]">Location</span>
                  <span className="text-xs font-semibold text-[#FFF9F0] mt-0.5">Downtown</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFF9F0]/12 backdrop-blur-md border border-[#FFF9F0]/20 flex flex-col items-center text-center shadow-md">
                  <Coffee className="w-4 h-4 text-[#D99352] mb-1" />
                  <span className="text-[10px] uppercase font-bold text-[#D99352]">Beans</span>
                  <span className="text-xs font-semibold text-[#FFF9F0] mt-0.5">100% Arabica</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FFF9F0]/12 backdrop-blur-md border border-[#FFF9F0]/20 flex flex-col items-center text-center shadow-md">
                  <Wifi className="w-4 h-4 text-[#D99352] mb-1" />
                  <span className="text-[10px] uppercase font-bold text-[#D99352]">Atmosphere</span>
                  <span className="text-xs font-semibold text-[#FFF9F0] mt-0.5">Work & Relax</span>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#D99352] to-[#B8753D] text-[#24130A] shadow-[0_8px_24px_rgba(217,147,82,0.45)] hover:shadow-[0_12px_32px_rgba(217,147,82,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Table</span>
                </button>

                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-[#FFF9F0]/15 hover:bg-[#FFF9F0]/25 text-[#FFF9F0] border border-[#FFF9F0]/30 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={onOpenStoryModal}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm text-[#FFF9F0]/90 hover:text-[#FFF9F0] transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#D99352]" />
                  <span>Our Story</span>
                </button>
              </div>
            </div>

            {/* SPACIOUS FLOATING STICKERS AROUND THE PERIMETER */}
            {FINALE_STICKERS.map((stk, i) => (
              <div
                key={stk.id}
                className={`absolute ${stk.pos} z-20 pointer-events-auto will-change-transform group cursor-pointer animate-gentle-bob`}
                style={{
                  animationDelay: stk.delay,
                  transform: `rotate(${stk.rotation}deg) translate3d(${mouseCoords.x * (i % 2 === 0 ? 16 : -16)}px, ${mouseCoords.y * (i % 2 === 0 ? 12 : -12)}px, 0)`,
                }}
              >
                <div className={`relative ${stk.size} flex flex-col items-center transition-all duration-300 group-hover:scale-115 group-hover:rotate-0`}>
                  {/* Die-cut sticker drop shadows */}
                  <div className="relative w-full h-full filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)] drop-shadow-[0_0_2px_rgba(255,249,240,0.7)]">
                    <Image
                      src={stk.image}
                      alt={stk.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                    />
                  </div>

                  {/* Playful sticker price badge */}
                  <div className="absolute -bottom-2 px-2.5 py-1 rounded-full bg-[#FFF9F0] text-[#24130A] shadow-[0_8px_16px_rgba(0,0,0,0.4)] border border-[#382014]/20 flex items-center gap-1.5 whitespace-nowrap text-[10px] sm:text-xs font-bold transition-all duration-200 group-hover:bg-[#D99352] group-hover:text-[#FFF9F0]">
                    <span>{stk.tag}</span>
                    <span className="text-[#8E5329] group-hover:text-[#FFF9F0]">₹{stk.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(stk.id);
                      }}
                      className="w-4 h-4 rounded-full bg-[#8E5329] text-[#FFF9F0] flex items-center justify-center text-[10px] font-bold group-hover:bg-[#FFF9F0] group-hover:text-[#24130A]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SIGNATURE 3D DEPTH TYPOGRAPHY SANDWICH:                                 */}
        {/* Layer 3: OVERLINED / OUTLINED STROKE TEXT (ON TOP of product image, z-[28]) */}
        {/* ========================================================================= */}
        {!isFinale && renderSandwichTypography(true)}

        {/* ========================================================================= */}
        {/* HERO BOTTOM BAR: Clean, transparent, zero glass box, minimal text        */}
        {/* ========================================================================= */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 md:left-14 right-4 sm:right-8 md:right-14 z-30 flex flex-col md:flex-row items-start md:items-end justify-between gap-5 pointer-events-none">
          {/* BOTTOM-LEFT: Minimal, airy brand message & CTAs (Fades in finale to highlight center hub) */}
          <div
            className={`max-w-md lg:max-w-lg pointer-events-auto transition-all duration-500 ${isFinale ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"
              }`}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9F0]/12 border border-[#FFF9F0]/20 text-[#FFF9F0] text-[11px] font-sans font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-[#D99352]" />
              <span>GOOD COFFEE · BRIGHTER DAYS</span>
            </div>

            {/* Headline: Clean, elegant, no background box */}
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#FFF9F0] mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              More Than Just Coffee
            </h1>

            {/* Concise 1-line subtext */}
            <p className="text-xs sm:text-sm text-[#FFF9F0]/85 font-light leading-relaxed mb-4 max-w-[36ch] drop-shadow-sm">
              Artisanal handpicked roasts and freshly baked Parisian pastries crafted with soul.
            </p>

            {/* CTAs & Social proof in one streamlined row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-[#D99352] to-[#B8753D] text-[#24130A] shadow-[0_8px_20px_rgba(217,147,82,0.4)] hover:shadow-[0_12px_28px_rgba(217,147,82,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenStoryModal}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm bg-[#FFF9F0]/15 hover:bg-[#FFF9F0]/25 text-[#FFF9F0] border border-[#FFF9F0]/30 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <div className="w-5 h-5 rounded-full bg-[#FFF9F0] text-[#24130A] flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Story</span>
              </button>

              {/* Compact social proof */}
              <div className="hidden sm:flex items-center gap-2.5 pl-2">
                <div className="flex -space-x-2">
                  {[
                    { initial: "A", bg: "bg-[#D99352]" },
                    { initial: "M", bg: "bg-[#B8753D]" },
                    { initial: "R", bg: "bg-[#8B7461]" },
                    { initial: "S", bg: "bg-[#382014]" },
                  ].map((av, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${av.bg} text-[#FFF9F0] border-2 border-[#FFF9F0]/80 flex items-center justify-center font-bold text-[9px] shadow-sm`}
                    >
                      {av.initial}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-[#FFF9F0] font-medium leading-none">
                  <span>15K+ Happy Sips</span>
                  <div className="flex items-center text-[#D99352] mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT: Streamlined Lenis Scrub Controls & Navigation */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {/* Scroll Indicator & Progress Bar */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#1E0F07]/80 backdrop-blur-xl border border-[#FFF9F0]/20 shadow-xl">
              <div className="hidden sm:block">
                <span className="text-[9px] text-[#D99352] font-mono">
                  {Math.round(currentProgress * 100)}%
                </span>
              </div>
              <div className="w-16 sm:w-24 h-1.5 bg-[#FFF9F0]/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D99352] to-[#FFF9F0] rounded-full transition-all duration-100"
                  style={{ width: `${Math.max(4, currentProgress * 100)}%` }}
                />
              </div>
            </div>

            {/* Stage Selector Pills */}
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#1E0F07]/80 backdrop-blur-xl border border-[#FFF9F0]/20 shadow-xl">
              {["01 Latte", "02 Brownie", "03 Croissant", "04 Shake", "05 Finale"].map(
                (label, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToStage(i)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${activeStageIndex === i
                      ? "bg-[#D99352] text-[#24130A] font-bold shadow-md"
                      : "text-[#FFF9F0]/70 hover:text-[#FFF9F0] hover:bg-[#FFF9F0]/10"
                      }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleNudge("left")}
                aria-label="Previous item"
                className="w-9 h-9 rounded-full bg-[#FFF9F0]/15 hover:bg-[#FFF9F0]/30 backdrop-blur-md text-[#FFF9F0] flex items-center justify-center transition-all border border-[#FFF9F0]/25 shadow-md active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNudge("right")}
                aria-label="Next item"
                className="w-9 h-9 rounded-full bg-[#FFF9F0]/15 hover:bg-[#FFF9F0]/30 backdrop-blur-md text-[#FFF9F0] flex items-center justify-center transition-all border border-[#FFF9F0]/25 shadow-md active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
