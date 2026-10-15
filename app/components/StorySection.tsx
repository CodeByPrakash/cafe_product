"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play, Award, Heart, Sparkles, Coffee } from "lucide-react";
import { CONFIG } from "../data/cafeData";

export default function StorySection({
  onOpenStoryModal,
}: {
  onOpenStoryModal: () => void;
}) {
  return (
    <section id="story" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Ambiance Image with Floating Stat Badge */}
        <div className="lg:col-span-6 relative">
          <div className="relative h-[420px] sm:h-[500px] w-full rounded-[40px] overflow-hidden shadow-[0_24px_60px_rgba(56,32,20,0.2)] border border-[#382014]/15 group">
            <Image
              src="/bgs/Golden Brewtoria Café Ambiance.png"
              alt="Brewtoria Café Interior with Warm Light and Plants"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24130A]/80 via-transparent to-transparent" />

            {/* Play Button Overlay */}
            <button
              onClick={onOpenStoryModal}
              aria-label="Watch the story of Brewtoria"
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#FFF9F0]/80 hover:bg-[#FFF9F0] text-[#382014] flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 group/play"
            >
              <Play className="w-6 h-6 fill-current ml-1 text-[#B8753D] group-hover/play:text-[#382014] transition-colors" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FFF9F0]/20 backdrop-blur-md border border-[#FFF9F0]/30 text-[#FFF9F0] flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-sm">Brewtoria Sanctuary</p>
                <p className="text-xs text-[#FFF9F0]/80">Evergreen Boulevard, Bengaluru</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#B8753D] text-[#FFF9F0]">
                Est. 2018
              </span>
            </div>
          </div>

          {/* Floating Accolade Badge */}
          <div className="absolute -bottom-6 -right-3 sm:-right-6 bg-[#FFF9F0] p-4 sm:p-5 rounded-3xl border border-[#382014]/10 shadow-[0_16px_36px_rgba(56,32,20,0.18)] flex items-center gap-3.5 z-10 max-w-[240px]">
            <div className="w-11 h-11 rounded-2xl bg-[#E9D5BD] text-[#B8753D] flex items-center justify-center flex-none">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#8B7461] leading-none">Award Winning</p>
              <p className="font-serif font-bold text-sm text-[#382014] mt-1">
                Best Artisan Roast 2025
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Narrative and Stats */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9D5BD] text-[#B8753D] text-xs font-bold tracking-wider uppercase mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>Our Heritage</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#382014] tracking-tight leading-tight mb-6">
            Crafted with Passion. <br />
            <span className="text-[#B8753D] italic font-normal">Served with Soul.</span>
          </h2>

          <p className="text-[#382014]/90 text-base sm:text-lg font-light leading-relaxed mb-4">
            Brewtoria started with a simple belief: a café should feel like the happiest part of your day. We source 100% single-origin Arabica directly from small shade-grown estates in Coorg and Ethiopia, micro-roasting in small batches to honor every bean&apos;s unique fruit and chocolate notes.
          </p>

          <p className="text-[#8B7461] text-sm sm:text-base leading-relaxed mb-8 font-light">
            Each morning at 5:00 AM, our pastry chefs hand-laminate French butter croissants and melt rich Belgian chocolate for our signature brownies. The seating is plush, the acoustic jazz is quiet, and the warm daylight turns our café into your happy place.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#382014]/15 mb-8">
            {CONFIG.stats.map((s, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-[#B8753D] block">
                  {s.value}
                </span>
                <span className="text-xs text-[#8B7461] font-sans mt-0.5 block leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#visit"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Visit Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenStoryModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-[#FFF9F0] hover:bg-[#E9D5BD]/40 text-[#382014] border border-[#382014]/20 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-[#B8753D]" />
              <span>Watch Video Tour</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
