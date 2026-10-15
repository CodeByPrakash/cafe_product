"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  Calendar,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { CONFIG } from "../data/cafeData";
import { useCart } from "../context/CartContext";
import OlaThemedMap from "./OlaThemedMap";

export default function LocationsSection() {
  const { setIsReservationOpen } = useCart();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Brewtoria Café ${CONFIG.address}`
  )}`;

  return (
    <section id="visit" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Hours, Location, and Booking CTAs */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E9D5BD] text-[#B8753D] text-xs font-bold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Find Your Haven</span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#382014] tracking-tight leading-tight mb-4">
            Visit Our Sanctuary
          </h2>

          <p className="text-base sm:text-lg text-[#8B7461] font-light leading-relaxed mb-8">
            Step into a sunlit space where the aroma of freshly ground roasts and buttered pastries welcomes you. Drop in for quiet focus, catch-ups, or weekend brunches.
          </p>

          {/* Address Card */}
          <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-[#382014]/10 mb-6 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#E9D5BD] text-[#B8753D] flex items-center justify-center flex-none mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-base text-[#382014]">
                Brewtoria Flagship Roastery
              </p>
              <p className="text-xs sm:text-sm text-[#8B7461] mt-0.5 font-light">
                {CONFIG.address}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#2A6635] font-semibold mt-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Open Now · Free High-Speed Wi-Fi & Power Outlets</span>
              </span>
            </div>
          </div>

          {/* Opening Hours Schedule */}
          <div className="p-5 rounded-2xl bg-[#FFF9F0] border border-[#382014]/10 mb-8 shadow-sm">
            <div className="flex items-center gap-2 font-serif font-bold text-base text-[#382014] mb-3">
              <Clock className="w-4 h-4 text-[#B8753D]" />
              <span>Operating Hours</span>
            </div>
            <ul className="space-y-2.5">
              {CONFIG.hours.map((h, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-[#382014]/10 last:border-none last:pb-0"
                >
                  <span className="text-[#382014] font-medium">{h.days}</span>
                  <span className="text-[#8B7461] font-mono">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-[#FFF9F0] hover:bg-[#E9D5BD]/40 text-[#382014] border border-[#382014]/20 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#B8753D]" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>

        {/* Right Column: Stylized Visual Map & Contact Info */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Ola-Themed Interactive Real Map */}
          <OlaThemedMap googleMapsUrl={googleMapsUrl} />

          {/* Direct Contact Inquiries Card */}
          <div id="contact" className="p-6 rounded-[28px] bg-[#FFF9F0] border border-[#382014]/10 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#E9D5BD]/30 border border-[#382014]/5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B7461] uppercase tracking-wider mb-1">
                <Phone className="w-3.5 h-3.5 text-[#B8753D]" />
                <span>Call Us Direct</span>
              </div>
              <a
                href={`tel:${CONFIG.phone.replace(/[^0-9+]/g, "")}`}
                className="font-serif font-bold text-base text-[#382014] hover:text-[#B8753D] transition-colors"
              >
                {CONFIG.phoneDisplay}
              </a>
              <p className="text-[11px] text-[#8B7461] mt-1">Direct barista desk & takeaways</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#E9D5BD]/30 border border-[#382014]/5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B7461] uppercase tracking-wider mb-1">
                <Mail className="w-3.5 h-3.5 text-[#B8753D]" />
                <span>Email & Events</span>
              </div>
              <a
                href={`mailto:${CONFIG.email}`}
                className="font-serif font-bold text-base text-[#382014] hover:text-[#B8753D] transition-colors"
              >
                {CONFIG.email}
              </a>
              <p className="text-[11px] text-[#8B7461] mt-1">Catering, beans, & private dining</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
