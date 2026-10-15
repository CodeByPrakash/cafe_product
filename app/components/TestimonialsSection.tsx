"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { REVIEWS, CONFIG } from "../data/cafeData";

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E9D5BD] text-[#B8753D] text-xs font-bold tracking-wider uppercase mb-3">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{CONFIG.rating} Star Average Rating</span>
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#382014] tracking-tight">
          What Guests Say
        </h2>
        <p className="text-sm sm:text-base text-[#8B7461] mt-2 font-light">
          Warm stories from coffee enthusiasts, book lovers, and daily regulars who make Brewtoria their second home.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {REVIEWS.map((rev) => (
          <blockquote
            key={rev.id}
            className="rounded-[30px] p-7 sm:p-8 bg-[#FFF9F0]/90 backdrop-blur-md border border-[#382014]/10 shadow-[0_12px_32px_rgba(56,32,20,0.06)] hover:shadow-[0_20px_45px_rgba(56,32,20,0.14)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1 text-[#D99352]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#E9D5BD]" />
              </div>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-[#382014]/90 font-light leading-relaxed italic mb-6">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            {/* Reviewer Details */}
            <div className="pt-4 border-t border-[#382014]/10 flex items-center justify-between">
              <div>
                <cite className="not-italic font-serif font-bold text-base text-[#382014] block">
                  {rev.name}
                </cite>
                <span className="text-xs text-[#8B7461]">{rev.role}</span>
              </div>
              <span className="text-[11px] text-[#8B7461]/80 font-mono">
                {rev.date}
              </span>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
