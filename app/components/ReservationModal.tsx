"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";

export default function ReservationModal() {
  const { isReservationOpen, setIsReservationOpen } = useCart();

  const [date, setDate] = useState("2026-10-15");

  useEffect(() => {
    try {
      const today = new Date();
      setDate(today.toISOString().split("T")[0]);
    } catch {
      // Ignore
    }
  }, []);
  const [time, setTime] = useState("11:00 AM");
  const [guests, setGuests] = useState("2");
  const [seating, setSeating] = useState("Window & Sunlight");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const timeSlots = [
    "8:30 AM",
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "3:30 PM",
    "5:00 PM",
    "6:30 PM",
    "8:00 PM",
  ];

  const seatingOptions = [
    "Window & Sunlight",
    "Cozy Reading Corner",
    "Lush Garden Patio",
    "Barista Brew Counter",
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const refId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(refId);
    setIsConfirmed(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D99352", "#B8753D", "#FFF9F0"],
      });
    } catch {
      // Ignore
    }
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setTimeout(() => {
      setIsConfirmed(false);
    }, 300);
  };

  if (!isReservationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#140A04]/70 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-[36px] bg-[#FFF9F0] border border-[#382014]/15 shadow-2xl p-6 sm:p-8 text-[#382014] z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          aria-label="Close reservation modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#382014]/5 hover:bg-[#382014]/10 text-[#382014] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isConfirmed ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9D5BD] text-[#B8753D] text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Table Hospitality</span>
            </div>

            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#382014] leading-tight mb-2">
              Reserve Your Table
            </h3>
            <p className="text-xs sm:text-sm text-[#8B7461] font-light mb-6">
              Skip the queue for peaceful brunches, focused work sessions, or intimate coffee gatherings.
            </p>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#382014] uppercase tracking-wider mb-1.5">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8B7461] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F7EBDD]/60 border border-[#382014]/15 text-xs sm:text-sm font-sans outline-none focus:border-[#B8753D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382014] uppercase tracking-wider mb-1.5">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#8B7461] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#F7EBDD]/60 border border-[#382014]/15 text-xs sm:text-sm font-sans outline-none focus:border-[#B8753D] appearance-none cursor-pointer"
                    >
                      <option value="1">1 Person (Solo Work/Focus)</option>
                      <option value="2">2 Persons (Couple / Catchup)</option>
                      <option value="4">4 Persons (Small Gathering)</option>
                      <option value="6">6 Persons (Brunch Group)</option>
                      <option value="8+">8+ Persons (Event Table)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Slots Selection */}
              <div>
                <label className="block text-xs font-bold text-[#382014] uppercase tracking-wider mb-1.5">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all ${
                        time === slot
                          ? "bg-[#B8753D] text-[#FFF9F0] shadow-md scale-105"
                          : "bg-[#F7EBDD]/60 text-[#382014] hover:bg-[#E9D5BD] border border-[#382014]/10"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-xs font-bold text-[#382014] uppercase tracking-wider mb-1.5">
                  Seating Area
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {seatingOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setSeating(opt)}
                      className={`p-2.5 text-left rounded-xl text-xs font-medium transition-all border ${
                        seating === opt
                          ? "bg-[#E9D5BD] text-[#382014] border-[#B8753D] font-bold shadow-sm"
                          : "bg-[#F7EBDD]/40 text-[#8B7461] border-[#382014]/10 hover:bg-[#E9D5BD]/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#382014] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7EBDD]/60 border border-[#382014]/15 text-xs sm:text-sm font-sans outline-none focus:border-[#B8753D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382014] uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 90000 00000"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F7EBDD]/60 border border-[#382014]/15 text-xs sm:text-sm font-sans outline-none focus:border-[#B8753D]"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-[#382014] uppercase tracking-wider mb-1">
                  Special Notes / Occasion (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Birthday slice, high chair needed, quiet corner"
                  className="w-full px-3.5 py-2 rounded-2xl bg-[#F7EBDD]/60 border border-[#382014]/15 text-xs font-sans outline-none focus:border-[#B8753D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs uppercase font-mono font-bold text-[#B8753D] tracking-wider block mb-1">
              Reservation Confirmed · {bookingId}
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#382014] mb-2">
              We look forward to hosting you, {name}!
            </h3>
            <p className="text-sm text-[#8B7461] max-w-sm mx-auto mb-6 font-light">
              Your table for <strong>{guests} {guests === "1" ? "guest" : "guests"}</strong> in the <strong>{seating}</strong> is reserved for <strong>{date}</strong> at <strong>{time}</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-[#E9D5BD]/40 text-left text-xs text-[#382014] mb-6 space-y-1.5 border border-[#382014]/10">
              <p>
                <strong>Location:</strong> 742 Evergreen Blvd, Central District, Bengaluru
              </p>
              <p>
                <strong>Table Hold Policy:</strong> We hold tables for up to 15 minutes past reservation time.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-[#382014] text-[#FFF9F0] font-bold text-sm hover:bg-[#B8753D] transition-colors shadow-md"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
