"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address (e.g. coffee@example.com)");
      return;
    }

    setStatus("success");
    setMessage("Welcome to the Brewtoria Circle! A secret welcome perk is on its way.");
    setEmail("");

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#D99352", "#B8753D", "#FFF9F0"],
      });
    } catch {
      // Ignore confetti issues if unsupported
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="rounded-[36px] sm:rounded-[44px] bg-gradient-to-r from-[#24130A] via-[#382014] to-[#4A2A15] p-8 sm:p-12 md:p-16 text-[#FFF9F0] shadow-2xl border border-[#FFF9F0]/15 relative overflow-hidden isolate flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Background ambient glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#D99352]/20 blur-3xl pointer-events-none" />

        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF9F0]/10 border border-[#FFF9F0]/20 text-[#D99352] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Artisan Journal</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#FFF9F0] tracking-tight leading-tight mb-2.5">
            Fresh News, Once a Month
          </h2>
          <p className="text-sm sm:text-base text-[#FFF9F0]/80 font-light leading-relaxed">
            Invitations to secret seasonal tastings, barista home-brewing masterclasses, and fresh single-origin reserve lot announcements. No spam, ever.
          </p>
        </div>

        {/* Subscribe Form */}
        <div className="w-full lg:w-auto lg:min-w-[420px]">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-[#FFF9F0]/50 absolute left-4 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="your.name@example.com"
                aria-label="Email address for café newsletter"
                className="w-full bg-[#FFF9F0]/10 border border-[#FFF9F0]/25 rounded-full pl-11 pr-32 py-3.5 text-sm text-[#FFF9F0] placeholder-[#FFF9F0]/40 outline-none focus:border-[#D99352] focus:ring-2 focus:ring-[#D99352]/30 transition-all font-sans"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D99352] to-[#B8753D] hover:from-[#FFF9F0] hover:to-[#FFF9F0] hover:text-[#24130A] text-[#24130A] font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Validation Feedback Message */}
            {status !== "idle" && (
              <p
                role="status"
                className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium ${
                  status === "error"
                    ? "text-[#FF8A80] bg-[#FF8A80]/10 border border-[#FF8A80]/20"
                    : "text-[#81C784] bg-[#81C784]/10 border border-[#81C784]/20"
                }`}
              >
                {status === "success" && <CheckCircle2 className="w-4 h-4 flex-none" />}
                <span>{message}</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
