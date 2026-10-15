"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/cafeData";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartCount,
    setPlacedOrderNumber,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent?: number;
    discountAmount?: number;
  } | null>(null);
  const [promoError, setPromoError] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === "BREW10") {
      setAppliedPromo({ code, discountPercent: 10 });
      setPromoError("");
    } else if (code === "WELCOME") {
      setAppliedPromo({ code, discountAmount: 50 });
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try 'BREW10' or 'WELCOME'");
    }
  };

  const discountValue = appliedPromo?.discountPercent
    ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
    : appliedPromo?.discountAmount
    ? Math.min(cartSubtotal, appliedPromo.discountAmount)
    : 0;

  const taxes = Math.round(cartSubtotal * 0.05); // 5% GST & sustainable packaging
  const finalTotal = Math.max(0, cartSubtotal - discountValue + (cartSubtotal > 0 ? taxes : 0));

  const handlePlaceOrder = () => {
    if (cartCount === 0) return;

    // Generate random order id
    const orderId = `BT-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D99352", "#B8753D", "#FFF9F0", "#382014"],
      });
    } catch {
      // Ignore
    }

    setPlacedOrderNumber(orderId);
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Dark Scrim Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[#140A04]/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Glass Drawer */}
      <aside
        aria-label="Shopping Cart Drawer"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-[#F7EBDD] text-[#382014] shadow-2xl flex flex-col justify-between transition-transform duration-400 ease-out border-l border-[#382014]/10 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 pb-4 border-b border-[#382014]/10 flex items-center justify-between bg-[#FFF9F0]/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#B8753D] text-[#FFF9F0] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-[#382014] leading-tight">
                Your Order
              </h3>
              <p className="text-xs text-[#8B7461]">
                {cartCount} {cartCount === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full bg-[#382014]/5 hover:bg-[#382014]/10 text-[#382014] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartCount > 0 ? (
            Object.entries(cart).map(([productId, quantity]) => {
              const product = PRODUCTS.find((p) => p.id === productId);
              if (!product) return null;

              return (
                <div
                  key={productId}
                  className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#382014]/10 flex items-center gap-3.5 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-[#E9D5BD]/40 flex-none flex items-center justify-center overflow-hidden p-1">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#382014] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#8B7461]">₹{product.price} each</p>
                    <span className="font-serif font-bold text-sm text-[#B8753D] block mt-0.5">
                      ₹{product.price * quantity}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-[#E9D5BD]/50 rounded-full p-1 border border-[#382014]/10">
                    <button
                      onClick={() => updateQuantity(productId, -1)}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 rounded-full bg-[#FFF9F0] text-[#382014] hover:bg-[#B8753D] hover:text-[#FFF9F0] flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-sans font-bold text-xs text-[#382014] min-w-[14px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(productId, 1)}
                      aria-label="Increase quantity"
                      className="w-6 h-6 rounded-full bg-[#B8753D] text-[#FFF9F0] hover:bg-[#D99352] flex items-center justify-center transition-colors text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(productId)}
                    aria-label={`Remove ${product.name} from cart`}
                    className="text-[#8B7461]/60 hover:text-[#D32F2F] p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          ) : (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-[#E9D5BD] text-[#B8753D] flex items-center justify-center mb-4">
                <ShoppingBag className="w-9 h-9 opacity-70" />
              </div>
              <h4 className="font-serif font-bold text-xl text-[#382014] mb-1">
                Your cart is empty
              </h4>
              <p className="text-xs text-[#8B7461] max-w-xs mb-6 font-light">
                Discover our specialty iced drinks, rich espresso, and buttery morning croissants.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const menuEl = document.getElementById("menu");
                  if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] font-bold text-xs shadow-md"
              >
                Browse Our Menu
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculations & Checkout */}
        {cartCount > 0 && (
          <div className="p-6 border-t border-[#382014]/10 bg-[#FFF9F0]/80 backdrop-blur-md">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8B7461] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Promo code (try 'BREW10')"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FFF9F0] border border-[#382014]/15 uppercase font-mono tracking-wider focus:outline-none focus:border-[#B8753D]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#382014] text-[#FFF9F0] text-xs font-bold hover:bg-[#B8753D] transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoError && (
                <p className="text-[11px] text-[#D32F2F] mt-1.5 ml-1">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-[11px] text-[#2E7D32] flex items-center gap-1 mt-1.5 ml-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Promo &apos;{appliedPromo.code}&apos; applied (-₹{discountValue})</span>
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#8B7461] mb-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#382014]">₹{cartSubtotal}</span>
              </div>
              {discountValue > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Discount</span>
                  <span className="font-semibold">-₹{discountValue}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5%) & Eco Packaging</span>
                <span className="font-semibold text-[#382014]">₹{taxes}</span>
              </div>
              <div className="pt-2 border-t border-[#382014]/10 flex justify-between text-base font-serif font-bold text-[#382014]">
                <span>Total Amount</span>
                <span className="text-[#B8753D]">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#B8753D] via-[#D99352] to-[#B8753D] text-[#24130A] font-bold text-sm shadow-[0_8px_24px_rgba(184,117,61,0.35)] hover:shadow-[0_12px_32px_rgba(184,117,61,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Place Order · Demo Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-[#8B7461]/80 text-center mt-2.5">
              Simulated checkout flow with order tracking & confirmation receipt.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
