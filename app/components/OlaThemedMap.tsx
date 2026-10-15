"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MapPin,
  Navigation,
  Plus,
  Minus,
  RotateCcw,
  Car,
  Compass,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CONFIG } from "../data/cafeData";

interface OlaThemedMapProps {
  googleMapsUrl: string;
}

export default function OlaThemedMap({ googleMapsUrl }: OlaThemedMapProps) {
  // Map pan & zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedRide, setSelectedRide] = useState<"mini" | "prime" | "auto">("mini");
  const [showTraffic, setShowTraffic] = useState(true);
  const [isHoveringMap, setIsHoveringMap] = useState(false);

  // Cab animation along the route
  const [cabProgress, setCabProgress] = useState(0.42);

  const containerRef = useRef<HTMLDivElement>(null);

  // Smoothly move the Ola cab along the route
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animateCab = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setCabProgress((prev) => {
        const next = prev + delta * 0.045;
        return next > 0.98 ? 0.05 : next;
      });

      animationFrameId = requestAnimationFrame(animateCab);
    };

    animationFrameId = requestAnimationFrame(animateCab);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle Drag / Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      // Clamp pan limits based on zoom
      const maxPan = 220 * zoom;
      setPan({
        x: Math.max(-maxPan, Math.min(maxPan, newX)),
        y: Math.max(-maxPan, Math.min(maxPan, newY)),
      });
    },
    [isDragging, dragStart, zoom]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const newX = e.touches[0].clientX - dragStart.x;
    const newY = e.touches[0].clientY - dragStart.y;
    const maxPan = 220 * zoom;
    setPan({
      x: Math.max(-maxPan, Math.min(maxPan, newX)),
      y: Math.max(-maxPan, Math.min(maxPan, newY)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(1.8, +(z + 0.2).toFixed(2)));
  const handleZoomOut = () => setZoom((z) => Math.max(0.75, +(z - 0.2).toFixed(2)));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Route definition points (for gray road network)
  // Route: Metro Station (120, 480) -> 100ft Rd junction (340, 480) -> 12th Main turn (340, 260) -> 4th Cross (560, 260) -> Brewtoria (560, 205)
  // Total polyline points for animated cab position calculation:
  const routeWaypoints = [
    { x: 140, y: 470 },
    { x: 330, y: 470 },
    { x: 330, y: 260 },
    { x: 530, y: 260 },
    { x: 530, y: 220 },
  ];

  // Calculate current cab coordinate along the piecewise route
  const getCabPosition = (progress: number) => {
    // 4 segments with lengths:
    // S1: 190px (140 to 330)
    // S2: 210px (470 to 260)
    // S3: 200px (330 to 530)
    // S4: 40px  (260 to 220)
    // Total = 640px
    const totalLen = 640;
    const currentDist = progress * totalLen;

    if (currentDist <= 190) {
      const t = currentDist / 190;
      return {
        x: 140 + t * 190,
        y: 470,
        angle: 0, // Facing right
      };
    } else if (currentDist <= 400) {
      const t = (currentDist - 190) / 210;
      return {
        x: 330,
        y: 470 - t * 210,
        angle: -90, // Facing up
      };
    } else if (currentDist <= 600) {
      const t = (currentDist - 400) / 200;
      return {
        x: 330 + t * 200,
        y: 260,
        angle: 0, // Facing right
      };
    } else {
      const t = (currentDist - 600) / 40;
      return {
        x: 530,
        y: 260 - t * 40,
        angle: -90, // Facing up to cafe
      };
    }
  };

  const cab = getCabPosition(cabProgress);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHoveringMap(true)}
      onMouseLeave={() => {
        setIsHoveringMap(false);
        setIsDragging(false);
      }}
      className="relative w-full h-[460px] sm:h-[490px] rounded-[36px] overflow-hidden shadow-2xl border border-[#382014]/30 bg-[#1A1412] text-[#FFF9F0] select-none isolate group"
    >
      {/* 1. Ola Style Top HUD (Floating Island) */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pointer-events-none">
        {/* Ola Live Navigation Pill */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#241711]/90 backdrop-blur-md border border-[#D99352]/30 shadow-lg">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#D99352] to-[#B8753D] flex items-center justify-center text-[#24130A] shadow-md font-bold text-xs">
            <Car className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-[#FFF9F0]">Ola Navigation</span>
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#34D399] font-medium border border-[#10B981]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                Live ETA: 3 min
              </span>
            </div>
            <span className="text-[11px] text-[#D99352] font-mono">
              1.2 km via 100 Ft Rd & 4th Cross
            </span>
          </div>
        </div>

        {/* Live Table Availability Status */}
        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-[#241711]/85 backdrop-blur-md border border-[#FFF9F0]/15 self-start sm:self-auto shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#D99352] animate-pulse" />
          <span className="text-xs font-medium text-[#FFF9F0]/90">
            Table Status: <span className="text-[#34D399] font-semibold">Available</span>
          </span>
          <span className="text-[10px] text-[#FFF9F0]/40 font-mono hidden md:inline ml-1">
            12.9716°N, 77.5946°E
          </span>
        </div>
      </div>

      {/* 2. Map Viewport Canvas / SVG Container */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden`}
        style={{
          touchAction: "none",
        }}
      >
        <div
          className="w-full h-full transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <svg
            viewBox="0 0 760 540"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Theme color building gradients */}
              <linearGradient id="bldgRoofMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A2A18" />
                <stop offset="100%" stopColor="#382014" />
              </linearGradient>

              <linearGradient id="bldgRoofHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5E341F" />
                <stop offset="100%" stopColor="#412415" />
              </linearGradient>

              <linearGradient id="bldgRoastery" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D99352" />
                <stop offset="50%" stopColor="#8A4A22" />
                <stop offset="100%" stopColor="#382014" />
              </linearGradient>

              <linearGradient id="bldgSide" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A170D" />
                <stop offset="100%" stopColor="#1B0F09" />
              </linearGradient>

              {/* Glowing Ola route line gradient */}
              <linearGradient id="olaRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#D99352" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              {/* Park greenery subtle gradient */}
              <linearGradient id="parkGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252D21" />
                <stop offset="100%" stopColor="#1C2419" />
              </linearGradient>

              {/* Water Canal */}
              <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1A2733" />
                <stop offset="100%" stopColor="#14202B" />
              </linearGradient>

              {/* Road Dash Pattern */}
              <pattern
                id="roadDashes"
                width="20"
                height="2"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="1"
                  x2="10"
                  y2="1"
                  stroke="#8E8E93"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </pattern>
            </defs>

            {/* Base Terrain Background (Dark Slate / Charcoal Ground) */}
            <rect width="760" height="540" fill="#1C1816" />

            {/* Subtle Urban Grid Texture */}
            <g opacity="0.12" stroke="#FFF9F0" strokeWidth="0.5">
              {Array.from({ length: 19 }).map((_, i) => (
                <line key={`vg-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="540" />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={`hg-${i}`} x1="0" y1={i * 40} x2="760" y2={i * 40} />
              ))}
            </g>

            {/* Green Urban Spaces / Parks */}
            <g id="parks">
              {/* Evergreen Boulevard Park */}
              <rect
                x="30"
                y="30"
                width="160"
                height="150"
                rx="14"
                fill="url(#parkGreen)"
                stroke="#354230"
                strokeWidth="1"
              />
              <text
                x="110"
                y="105"
                textAnchor="middle"
                fill="#5A7350"
                fontSize="10"
                fontWeight="600"
                letterSpacing="1.5"
              >
                EVERGREEN PARK
              </text>
              {/* Park Tree Dots */}
              {[
                [55, 60],
                [85, 55],
                [140, 70],
                [65, 130],
                [110, 140],
                [155, 125],
                [90, 80],
              ].map(([tx, ty], idx) => (
                <circle key={`pt-${idx}`} cx={tx} cy={ty} r="5" fill="#3D5036" />
              ))}

              {/* South Plaza Garden */}
              <rect
                x="410"
                y="370"
                width="180"
                height="120"
                rx="12"
                fill="url(#parkGreen)"
                stroke="#354230"
                strokeWidth="1"
              />
              <text
                x="500"
                y="435"
                textAnchor="middle"
                fill="#5A7350"
                fontSize="9"
                fontWeight="600"
                letterSpacing="1"
              >
                ROASTERY HERB ARBORETUM
              </text>
            </g>

            {/* Water Canal / Lake Edge */}
            <path
              d="M 640 0 C 660 140, 680 280, 760 360 L 760 0 Z"
              fill="url(#waterFlow)"
              stroke="#26384A"
              strokeWidth="1"
            />
            <text
              x="710"
              y="180"
              transform="rotate(75, 710, 180)"
              fill="#3A526B"
              fontSize="9"
              letterSpacing="2"
            >
              ULSOOR CANAL LINK
            </text>

            {/* ========================================================
                THEME-COLOR BUILDINGS (Isometric / 2.5D Blocks)
                Base tones: #382014, #4A2A18, #2B170E, #5E341F with Amber accents
               ======================================================== */}
            <g id="buildings">
              {/* Block A: Commercial & Retail Row (Top Left) */}
              {/* Building A1 */}
              <g className="transition-all duration-300 hover:opacity-90">
                <path d="M 50 205 L 120 205 L 120 240 L 50 240 Z" fill="url(#bldgSide)" />
                <path d="M 50 195 L 120 195 L 120 230 L 50 230 Z" fill="url(#bldgRoofMain)" stroke="#D99352" strokeWidth="0.6" />
                <text x="85" y="215" textAnchor="middle" fill="#E9D5BD" fontSize="8" opacity="0.7">Tech Hub</text>
              </g>

              {/* Building A2 */}
              <g>
                <path d="M 135 205 L 205 205 L 205 240 L 135 240 Z" fill="url(#bldgSide)" />
                <path d="M 135 195 L 205 195 L 205 230 L 135 230 Z" fill="url(#bldgRoofHighlight)" stroke="#D99352" strokeWidth="0.6" />
                <text x="170" y="215" textAnchor="middle" fill="#E9D5BD" fontSize="8" opacity="0.7">Studio 12</text>
              </g>

              {/* Block B: North-East Quarter */}
              {/* Building B1 */}
              <g>
                <path d="M 370 65 L 450 65 L 450 125 L 370 125 Z" fill="url(#bldgSide)" />
                <path d="M 370 55 L 450 55 L 450 115 L 370 115 Z" fill="url(#bldgRoofMain)" stroke="#B8753D" strokeWidth="0.8" />
                <text x="410" y="88" textAnchor="middle" fill="#E9D5BD" fontSize="9" fontWeight="500">Design Quarter</text>
                {/* Lit Window Accents */}
                <rect x="385" y="100" width="8" height="4" fill="#D99352" opacity="0.8" rx="1" />
                <rect x="405" y="100" width="8" height="4" fill="#D99352" opacity="0.8" rx="1" />
                <rect x="425" y="100" width="8" height="4" fill="#D99352" opacity="0.8" rx="1" />
              </g>

              {/* Building B2 */}
              <g>
                <path d="M 470 65 L 560 65 L 560 125 L 470 125 Z" fill="url(#bldgSide)" />
                <path d="M 470 55 L 560 55 L 560 115 L 470 115 Z" fill="url(#bldgRoofHighlight)" stroke="#B8753D" strokeWidth="0.8" />
                <text x="515" y="88" textAnchor="middle" fill="#E9D5BD" fontSize="8" opacity="0.7">Artisan Residences</text>
              </g>

              {/* Block C: South-West Quarter */}
              <g>
                <path d="M 50 340 L 150 340 L 150 420 L 50 420 Z" fill="url(#bldgSide)" />
                <path d="M 50 330 L 150 330 L 150 410 L 50 410 Z" fill="url(#bldgRoofMain)" stroke="#B8753D" strokeWidth="0.8" />
                <text x="100" y="375" textAnchor="middle" fill="#E9D5BD" fontSize="9" fontWeight="600">IND. METRO</text>
                <rect x="70" y="388" width="60" height="12" rx="3" fill="#10B981" opacity="0.8" />
                <text x="100" y="397" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">PURPLE LINE</text>
              </g>

              {/* Block D: South Middle Blocks */}
              <g>
                <path d="M 175 340 L 260 340 L 260 410 L 175 410 Z" fill="url(#bldgSide)" />
                <path d="M 175 330 L 260 330 L 260 400 L 175 400 Z" fill="url(#bldgRoofHighlight)" stroke="#D99352" strokeWidth="0.6" />
                <text x="217" y="368" textAnchor="middle" fill="#E9D5BD" fontSize="8" opacity="0.7">Bookstore & Co</text>
              </g>

              {/* Block E: Middle North Blocks */}
              <g>
                <path d="M 230 65 L 300 65 L 300 150 L 230 150 Z" fill="url(#bldgSide)" />
                <path d="M 230 55 L 300 55 L 300 140 L 230 140 Z" fill="url(#bldgRoofMain)" stroke="#D99352" strokeWidth="0.6" />
                <text x="265" y="100" textAnchor="middle" fill="#E9D5BD" fontSize="8" opacity="0.7">Boutiques</text>
              </g>

              {/* ========================================================
                  FLAGSHIP DESTINATION: BREWTORIA ROASTERY
                  Center-Right building (x: 480 to 590, y: 145 to 205)
                  Rich multi-tier 3D roastery pavilion with amber roof terrace
                 ======================================================== */}
              <g id="brewtoria-building" className="filter drop-shadow-[0_12px_24px_rgba(217,147,82,0.35)]">
                {/* 3D Base Shadow */}
                <path d="M 470 155 L 590 155 L 590 220 L 470 220 Z" fill="#140A05" />

                {/* 3D Facade Walls */}
                <path d="M 470 145 L 590 145 L 590 215 L 470 215 Z" fill="url(#bldgSide)" />

                {/* Main Rooftop Terrace (Rich Roastery Amber / Espresso) */}
                <path
                  d="M 470 135 L 590 135 L 590 205 L 470 205 Z"
                  fill="url(#bldgRoastery)"
                  stroke="#F59E0B"
                  strokeWidth="1.8"
                />

                {/* Skylight Atrium on Roastery Roof */}
                <rect
                  x="500"
                  y="150"
                  width="60"
                  height="35"
                  rx="4"
                  fill="#FFF9F0"
                  opacity="0.25"
                  stroke="#FFF9F0"
                  strokeWidth="0.8"
                />

                {/* Golden Coffee Bean / Roastery Sign on Roof */}
                <circle cx="530" cy="167" r="11" fill="#24130A" stroke="#D99352" strokeWidth="1.5" />
                <path
                  d="M 526 167 C 526 162, 534 162, 534 167 C 534 172, 526 172, 526 167 Z"
                  fill="#D99352"
                />

                {/* Name Label on Building */}
                <text
                  x="530"
                  y="198"
                  textAnchor="middle"
                  fill="#FFF9F0"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0.8"
                >
                  BREWTORIA ROASTERY
                </text>
              </g>

              {/* Neighboring Roastery Annex */}
              <g>
                <path d="M 605 150 L 655 150 L 655 210 L 605 210 Z" fill="url(#bldgSide)" />
                <path d="M 605 142 L 655 142 L 655 202 L 605 202 Z" fill="url(#bldgRoofMain)" stroke="#D99352" strokeWidth="0.6" />
                <text x="630" y="175" textAnchor="middle" fill="#E9D5BD" fontSize="7" opacity="0.8">Bakery Annex</text>
              </g>
            </g>

            {/* ========================================================
                REAL OLA-TYPE GRAY ROAD NETWORK
                Rendered with high-contrast realistic dark asphalt grays:
                - Highways & Arterial Avenues: #48484E / #3E3E44 (wide)
                - Secondary cross streets: #333338
                - Yellow/White lane divider dashes
               ======================================================== */}
            <g id="roads">
              {/* Secondary Cross Streets (Base Gray) */}
              {/* Street going vertically on left */}
              <line x1="218" y1="0" x2="218" y2="540" stroke="#2D2D33" strokeWidth="18" />
              <line x1="218" y1="0" x2="218" y2="540" stroke="#3D3D45" strokeWidth="14" />

              {/* Upper Horizontal Lane */}
              <line x1="0" y1="175" x2="330" y2="175" stroke="#2D2D33" strokeWidth="18" />
              <line x1="0" y1="175" x2="330" y2="175" stroke="#3D3D45" strokeWidth="14" />

              {/* 100 FT ROAD / MAIN ARTERIAL HIGHWAY (Horizontal across bottom) */}
              {/* Outer Road Kerb / Border */}
              <line x1="0" y1="470" x2="760" y2="470" stroke="#27272C" strokeWidth="36" />
              {/* Gray Asphalt Surface */}
              <line x1="0" y1="470" x2="760" y2="470" stroke="#48484E" strokeWidth="30" />
              {/* Inner lane lines */}
              <line
                x1="0"
                y1="470"
                x2="760"
                y2="470"
                stroke="#D4D4D8"
                strokeWidth="1.5"
                strokeDasharray="14 14"
                opacity="0.65"
              />

              {/* 12TH MAIN BOULEVARD (Vertical Arterial linking 100ft road to 4th cross) */}
              <line x1="330" y1="175" x2="330" y2="540" stroke="#27272C" strokeWidth="32" />
              <line x1="330" y1="175" x2="330" y2="540" stroke="#48484E" strokeWidth="26" />
              <line
                x1="330"
                y1="175"
                x2="330"
                y2="540"
                stroke="#D4D4D8"
                strokeWidth="1.5"
                strokeDasharray="12 12"
                opacity="0.65"
              />

              {/* 4TH CROSS ROAD (Leading directly to Brewtoria Roastery) */}
              <line x1="330" y1="260" x2="760" y2="260" stroke="#27272C" strokeWidth="30" />
              <line x1="330" y1="260" x2="760" y2="260" stroke="#424248" strokeWidth="24" />
              <line
                x1="330"
                y1="260"
                x2="760"
                y2="260"
                stroke="#D4D4D8"
                strokeWidth="1.5"
                strokeDasharray="10 10"
                opacity="0.6"
              />

              {/* Roastery Entry Driveway (Access Alley) */}
              <line x1="530" y1="260" x2="530" y2="210" stroke="#27272C" strokeWidth="18" />
              <line x1="530" y1="260" x2="530" y2="210" stroke="#52525A" strokeWidth="14" />

              {/* Zebra Crossings */}
              {/* Crossing on 100ft Rd near Metro */}
              <g stroke="#E4E4E7" strokeWidth="2" opacity="0.8">
                <line x1="160" y1="458" x2="160" y2="482" />
                <line x1="166" y1="458" x2="166" y2="482" />
                <line x1="172" y1="458" x2="172" y2="482" />
                <line x1="178" y1="458" x2="178" y2="482" />
                <line x1="184" y1="458" x2="184" y2="482" />
              </g>

              {/* Crossing on 4th Cross in front of Cafe */}
              <g stroke="#E4E4E7" strokeWidth="2" opacity="0.8">
                <line x1="500" y1="250" x2="500" y2="270" />
                <line x1="506" y1="250" x2="506" y2="270" />
                <line x1="512" y1="250" x2="512" y2="270" />
                <line x1="518" y1="250" x2="518" y2="270" />
              </g>

              {/* Street Names (Gray Roads Real Signage) */}
              <text
                x="60"
                y="464"
                fill="#D4D4D8"
                fontSize="9"
                fontWeight="bold"
                letterSpacing="1.2"
                opacity="0.8"
              >
                100 FT ROAD (INDIRANAGAR)
              </text>

              <text
                x="337"
                y="380"
                transform="rotate(90, 337, 380)"
                fill="#D4D4D8"
                fontSize="9"
                fontWeight="bold"
                letterSpacing="1.5"
                opacity="0.8"
              >
                12TH MAIN ROAD
              </text>

              <text
                x="375"
                y="254"
                fill="#D4D4D8"
                fontSize="9"
                fontWeight="bold"
                letterSpacing="1.2"
                opacity="0.8"
              >
                4TH CROSS ROAD
              </text>

              <text
                x="565"
                y="254"
                fill="#F59E0B"
                fontSize="8"
                fontWeight="bold"
                letterSpacing="0.8"
              >
                BREWTORIA WAY
              </text>
            </g>

            {/* ========================================================
                OLA NAVIGATION ROUTE (Live Glowing Amber Polyline)
                Traces the fastest turn-by-turn route to Brewtoria
               ======================================================== */}
            {showTraffic && (
              <g id="ola-navigation-layer">
                {/* Outer Glow Path */}
                <path
                  d="M 140 470 L 330 470 L 330 260 L 530 260 L 530 215"
                  fill="none"
                  stroke="#D99352"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.3"
                  className="animate-pulse"
                />

                {/* Core Amber Route Path */}
                <path
                  d="M 140 470 L 330 470 L 330 260 L 530 260 L 530 215"
                  fill="none"
                  stroke="url(#olaRouteGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Flowing animated dash particles */}
                <path
                  d="M 140 470 L 330 470 L 330 260 L 530 260 L 530 215"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="8 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                  style={{
                    animation: "olaRouteDash 1.4s linear infinite",
                  }}
                />

                {/* Turn Junction Directional Chevron Arrows */}
                {/* Arrow 1 on 100ft Rd */}
                <path d="M 230 467 L 236 470 L 230 473" stroke="#24130A" strokeWidth="2" fill="none" />
                {/* Arrow 2 on 12th Main (Northbound) */}
                <path d="M 327 340 L 330 334 L 333 340" stroke="#24130A" strokeWidth="2" fill="none" />
                {/* Arrow 3 on 4th Cross (Eastbound) */}
                <path d="M 430 257 L 436 260 L 430 263" stroke="#24130A" strokeWidth="2" fill="none" />

                {/* START POINT: Indiranagar Metro Station Pickup */}
                <g transform="translate(140, 470)">
                  <circle r="9" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle r="3" fill="#FFFFFF" />
                  {/* Tooltip badge */}
                  <g transform="translate(0, -22)">
                    <rect
                      x="-55"
                      y="-12"
                      width="110"
                      height="20"
                      rx="6"
                      fill="#1E293B"
                      stroke="#10B981"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="2"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      Pickup: Ind. Metro
                    </text>
                  </g>
                </g>

                {/* LIVE OLA CAB MOVING ALONG THE GRAY ROADS */}
                <g
                  transform={`translate(${cab.x}, ${cab.y}) rotate(${cab.angle})`}
                  className="transition-transform duration-75"
                >
                  {/* Cab Outer Glow */}
                  <circle r="14" fill="#F59E0B" opacity="0.3" className="animate-ping" />
                  {/* Car Body (Ola Themed Cab) */}
                  <rect
                    x="-12"
                    y="-7"
                    width="24"
                    height="14"
                    rx="4"
                    fill="#FBBF24"
                    stroke="#18181B"
                    strokeWidth="1.5"
                  />
                  {/* Windshield */}
                  <rect x="2" y="-5" width="4" height="10" rx="1" fill="#1E293B" />
                  {/* Ola Cab Roof Sign */}
                  <rect x="-3" y="-3" width="6" height="6" rx="1" fill="#10B981" />
                  {/* Headlights */}
                  <circle cx="11" cy="-4" r="1.5" fill="#FEF08A" />
                  <circle cx="11" cy="4" r="1.5" fill="#FEF08A" />
                </g>

                {/* DESTINATION PIN: Brewtoria Flagship Roastery */}
                <g transform="translate(530, 210)">
                  {/* Animated Radar Pulse Rings */}
                  <circle r="22" fill="none" stroke="#D99352" strokeWidth="1.5" opacity="0.4" className="animate-ping" />
                  <circle r="36" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.2" className="animate-pulse" />

                  {/* Marker Pin */}
                  <circle r="15" fill="url(#bldgRoastery)" stroke="#FFF9F0" strokeWidth="2.5" className="shadow-2xl" />
                  <path
                    d="M-4 -3 L0 -8 L4 -3 L2 3 L-2 3 Z"
                    fill="#FFF9F0"
                  />
                  <circle cx="0" cy="0" r="2.5" fill="#24130A" />

                  {/* Pin Callout Card */}
                  <g transform="translate(0, -32)">
                    <rect
                      x="-70"
                      y="-16"
                      width="140"
                      height="26"
                      rx="8"
                      fill="#24130A"
                      stroke="#D99352"
                      strokeWidth="1.2"
                      className="shadow-xl"
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      fill="#FFF9F0"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      Brewtoria Flagship
                    </text>
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#D99352"
                      fontSize="7.5"
                      fontWeight="medium"
                    >
                      Destination • 0 min to entrance
                    </text>
                  </g>
                </g>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* 3. Ola Ride Category Selection Strip (Ola Type Drawer / Footer) */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Ride Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#241711]/90 backdrop-blur-md border border-[#FFF9F0]/15 shadow-xl">
          <button
            onClick={() => setSelectedRide("mini")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedRide === "mini"
                ? "bg-[#D99352] text-[#24130A] shadow-md font-bold scale-[1.02]"
                : "text-[#FFF9F0]/70 hover:text-[#FFF9F0] hover:bg-[#FFF9F0]/5"
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Mini</span>
            <span className="opacity-80 font-mono text-[11px]">₹129</span>
          </button>

          <button
            onClick={() => setSelectedRide("prime")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedRide === "prime"
                ? "bg-[#D99352] text-[#24130A] shadow-md font-bold scale-[1.02]"
                : "text-[#FFF9F0]/70 hover:text-[#FFF9F0] hover:bg-[#FFF9F0]/5"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Prime</span>
            <span className="opacity-80 font-mono text-[11px]">₹169</span>
          </button>

          <button
            onClick={() => setSelectedRide("auto")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedRide === "auto"
                ? "bg-[#D99352] text-[#24130A] shadow-md font-bold scale-[1.02]"
                : "text-[#FFF9F0]/70 hover:text-[#FFF9F0] hover:bg-[#FFF9F0]/5"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Auto</span>
            <span className="opacity-80 font-mono text-[11px]">₹59</span>
          </button>
        </div>

        {/* Action Link to Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-[#FFF9F0]/15 hover:bg-[#D99352] hover:text-[#24130A] backdrop-blur-md border border-[#FFF9F0]/25 text-[#FFF9F0] font-bold text-xs shadow-xl transition-all duration-200 group/btn"
        >
          <span>Open in Google Maps</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>

      {/* 4. Map Control Buttons (+ / - / Recenter) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          aria-label="Zoom in"
          className="w-8 h-8 rounded-xl bg-[#241711]/90 hover:bg-[#D99352] hover:text-[#24130A] backdrop-blur-md border border-[#FFF9F0]/15 text-[#FFF9F0] flex items-center justify-center transition-colors shadow-lg active:scale-90"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="Zoom out"
          className="w-8 h-8 rounded-xl bg-[#241711]/90 hover:bg-[#D99352] hover:text-[#24130A] backdrop-blur-md border border-[#FFF9F0]/15 text-[#FFF9F0] flex items-center justify-center transition-colors shadow-lg active:scale-90"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          aria-label="Recenter map"
          className="w-8 h-8 rounded-xl bg-[#241711]/90 hover:bg-[#D99352] hover:text-[#24130A] backdrop-blur-md border border-[#FFF9F0]/15 text-[#FFF9F0] flex items-center justify-center transition-colors shadow-lg active:scale-90"
          title="Recenter"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5. Pan Hint on First Hover */}
      <div
        className={`absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 px-3 py-1 rounded-full bg-[#18120F]/80 backdrop-blur-md text-[11px] text-[#D99352] border border-[#D99352]/20 flex items-center gap-1.5 ${
          isHoveringMap ? "opacity-90" : "opacity-0"
        }`}
      >
        <Compass className="w-3 h-3 animate-spin" />
        <span>Drag to pan · Gray roads · Theme buildings</span>
      </div>

      {/* Global CSS for the flowing route dashes */}
      <style jsx>{`
        @keyframes olaRouteDash {
          from {
            stroke-dashoffset: 44;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
