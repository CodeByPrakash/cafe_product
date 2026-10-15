"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Play, Volume2, VolumeX, Sparkles, Coffee, Heart } from "lucide-react";

export default function StoryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isMuted, setIsMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#140A04]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-[40px] overflow-hidden bg-[#24130A] border border-[#FFF9F0]/20 shadow-2xl text-[#FFF9F0] z-10 isolate">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close story video"
          className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-[#140A04]/60 hover:bg-[#140A04]/90 text-[#FFF9F0] flex items-center justify-center backdrop-blur-md border border-[#FFF9F0]/20 transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Video Tour Graphic */}
        <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden">
          <Image
            src="/images/cozy-interior.jpg"
            alt="Brewtoria Roastery & Café Film"
            fill
            className="object-cover object-center filter brightness-90 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24130A] via-[#24130A]/30 to-transparent" />

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#24130A]/70 backdrop-blur-md text-xs border border-[#FFF9F0]/20 hover:bg-[#24130A] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#D99352]" /> : <Volume2 className="w-4 h-4 text-[#D99352]" />}
            <span>{isMuted ? "Audio Off" : "Ambient Cafe Jazz Playing"}</span>
          </button>

          {/* Center Play Indicator */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
            <div className="w-18 h-18 rounded-full bg-[#D99352] text-[#24130A] flex items-center justify-center mb-4 shadow-[0_0_50px_rgba(217,147,82,0.8)] animate-pulse">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#D99352] font-mono font-bold">
              The Artisan Process · 4K Film
            </span>
          </div>
        </div>

        {/* Story Narrative Footer */}
        <div className="p-6 sm:p-8 bg-[#24130A] border-t border-[#FFF9F0]/10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D99352] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Behind The Roast</span>
          </div>

          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FFF9F0] mb-3">
            Every Morning at Brewtoria
          </h3>
          <p className="text-sm text-[#FFF9F0]/85 font-light leading-relaxed mb-6">
            &ldquo;From high-altitude estate farmers in Coorg to our morning pastry proofing cabinets, we treat coffee not as a commodity, but as a daily pause. A slow breath in a fast world.&rdquo;
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-[#FFF9F0]/10 text-xs text-[#FFF9F0]/60">
            <span>Founded 2018 · Master Roaster: Kabir Mehra</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#D99352] text-[#24130A] font-bold hover:bg-[#FFF9F0] transition-colors"
            >
              Back to Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
