"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero3DShowcase from "./components/Hero3DShowcase";
import MenuSection from "./components/MenuSection";
import FeaturedPromos from "./components/FeaturedPromos";
import StorySection from "./components/StorySection";
import SignatureGallery from "./components/SignatureGallery";
import TestimonialsSection from "./components/TestimonialsSection";
import LocationsSection from "./components/LocationsSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ReservationModal from "./components/ReservationModal";
import QuickViewModal from "./components/QuickViewModal";
import StoryModal from "./components/StoryModal";
import OrderConfirmationModal from "./components/OrderConfirmationModal";
import Toast from "./components/Toast";

export default function Home() {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F7EBDD] text-[#382014] selection:bg-[#B8753D] selection:text-[#FFF9F0]">
      {/* Floating Navbar */}
      <Navbar />

      {/* Hero Section: 3D Gliding Showcase & Glassmorphic Text Panel */}
      <Hero3DShowcase onOpenStoryModal={() => setIsStoryModalOpen(true)} />

      {/* Main Content Body with smooth top curve overlapping hero */}
      <main className="relative z-10 bg-[#F7EBDD] rounded-t-[40px] sm:rounded-t-[48px] -mt-10 sm:-mt-12 shadow-[0_-20px_60px_rgba(36,19,10,0.18)]">
        {/* Menu Section with Categories & Reactive Filter Grid */}
        <MenuSection />

        {/* 3 Featured Visual Promotional Cards */}
        <FeaturedPromos />

        {/* Our Story & Roasting Heritage */}
        <StorySection onOpenStoryModal={() => setIsStoryModalOpen(true)} />

        {/* Signature Products Horizontal Gallery */}
        <SignatureGallery />

        {/* Customer Testimonials & Reviews */}
        <TestimonialsSection />

        {/* Location, Operating Hours, and Directions */}
        <LocationsSection />

        {/* Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Modals & Interactive Overlays */}
      <CartDrawer />
      <ReservationModal />
      <QuickViewModal />
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />
      <OrderConfirmationModal />
      <Toast />
    </div>
  );
}
