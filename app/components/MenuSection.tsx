"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  Coffee,
  Flame,
  Leaf,
  Croissant,
  Cake,
  CupSoda,
  Sparkles,
  Search,
  Plus,
  Minus,
  Eye,
  Star,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { CATEGORIES, PRODUCTS, Product } from "../data/cafeData";

export default function MenuSection() {
  const {
    cart,
    addToCart,
    updateQuantity,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setQuickViewProduct,
  } = useCart();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-5 h-5" />;
      case "Leaf":
        return <Leaf className="w-5 h-5" />;
      case "Croissant":
        return <Croissant className="w-5 h-5" />;
      case "Cake":
        return <Cake className="w-5 h-5" />;
      case "CupSoda":
        return <CupSoda className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Coffee className="w-5 h-5" />;
    }
  };

  // Filter products based on selected category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.cats.includes(selectedCategory);
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        (item.ingredients && item.ingredients.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9D5BD] text-[#B8753D] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated For Perfection</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#382014] tracking-tight">
            Our Artisanal Menu
          </h2>
          <p className="text-[#8B7461] text-base sm:text-lg mt-2 max-w-xl font-light">
            Every cup brewed to order from freshly micro-roasted Arabica beans, paired with treats baked from Normandy butter every dawn.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex items-center gap-3">
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-[#8B7461] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter drinks & bites..."
              className="w-full bg-[#FFF9F0] border border-[#382014]/15 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#382014] placeholder-[#8B7461]/60 focus:outline-none focus:border-[#B8753D] focus:ring-2 focus:ring-[#B8753D]/20 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Bar Matching Reference Image */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-4 mb-10 no-scrollbar scroll-smooth">
        {/* Left Filter Indicator */}
        <div className="flex-none flex items-center gap-2 text-xs font-semibold text-[#8B7461] pr-2 hidden sm:flex">
          <SlidersHorizontal className="w-4 h-4 text-[#B8753D]" />
          <span>Filter by Category</span>
        </div>

        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSearchQuery("");
              }}
              aria-pressed={isActive}
              className={`flex-none flex flex-col items-center justify-center gap-1.5 w-20 sm:w-24 py-3 px-2 rounded-2xl font-sans text-xs transition-all duration-300 border ${
                isActive
                  ? "bg-[#8E5329] text-[#FFF9F0] border-transparent shadow-[0_8px_20px_rgba(142,83,41,0.35)] scale-105 font-bold"
                  : "bg-[#FFF9F0] text-[#382014] border-[#382014]/10 hover:border-[#B8753D]/40 hover:bg-[#E9D5BD]/40 font-medium"
              }`}
            >
              <span className={isActive ? "text-[#FFF9F0]" : "text-[#B8753D]"}>
                {getCategoryIcon(cat.iconName)}
              </span>
              <span className="truncate max-w-full text-[11px] sm:text-xs">
                {cat.label === "Specialty Coffee" ? "Coffee" : cat.label === "Bakery & Snacks" ? "Snacks" : cat.label === "Decadent Desserts" ? "Desserts" : cat.label === "Seasonal Specials" ? "Seasonal" : cat.label === "Tea & Matcha" ? "Tea" : cat.label}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => {
            setSelectedCategory("all");
            setSearchQuery("");
          }}
          className="ml-auto flex-none text-xs sm:text-sm font-semibold text-[#382014] hover:text-[#B8753D] transition-colors whitespace-nowrap pl-4"
        >
          View Full Menu →
        </button>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((item, index) => {
            const quantityInCart = cart[item.id] || 0;

            return (
              <article
                key={item.id}
                style={{ animationDelay: `${index * 60}ms` }}
                className="group bg-[#FFF9F0]/85 backdrop-blur-md rounded-[28px] border border-[#382014]/10 p-5 flex flex-col justify-between shadow-[0_10px_28px_rgba(56,32,20,0.06)] hover:shadow-[0_20px_45px_rgba(56,32,20,0.15)] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Pedestal with Ambient Background from public/bgs */}
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-4 border border-[#382014]/10 bg-[#E9D5BD]/40 flex items-center justify-center">
                    {/* Thematic Background from public/bgs */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:opacity-65 transition-all duration-700 ease-out group-hover:scale-105 filter saturate-110"
                      style={{
                        backgroundImage: `url('${
                          item.cats.includes("snacks") || item.cats.includes("desserts")
                            ? "/bgs/Golden Brewtoria Café Ambiance.png"
                            : "/bgs/Warm Café Cream and Orange Hero Scene.png"
                        }')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9F0]/85 via-transparent to-[#FFF9F0]/20" />

                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-3 left-3 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#B8753D] text-[#FFF9F0] shadow-sm">
                        {item.badge}
                      </span>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={() => setQuickViewProduct(item)}
                      aria-label={`Quick view details for ${item.name}`}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#FFF9F0]/90 hover:bg-[#FFF9F0] text-[#382014] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md hover:scale-110"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Product Image */}
                    <div className="relative w-44 h-44 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2 z-10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={280}
                        height={280}
                        className="w-full h-full object-contain filter drop-shadow-[0_16px_20px_rgba(56,32,20,0.35)]"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Rating & Prep details */}
                  <div className="flex items-center justify-between text-xs text-[#8B7461] mb-1.5">
                    <div className="flex items-center gap-1 text-[#B8753D] font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                    {item.prepTime && <span>{item.prepTime}</span>}
                  </div>

                  {/* Product Title & Subtitle */}
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#382014] leading-tight group-hover:text-[#B8753D] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#8B7461] font-sans mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Price and Cart Add Controls */}
                <div className="pt-5 mt-4 border-t border-[#382014]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#8B7461] block leading-none">
                      Price
                    </span>
                    <span className="font-serif font-bold text-xl text-[#382014]">
                      ₹{item.price}
                    </span>
                  </div>

                  {quantityInCart > 0 ? (
                    <div className="flex items-center gap-2 bg-[#E9D5BD] rounded-full p-1 border border-[#B8753D]/30 shadow-inner">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-7 h-7 rounded-full bg-[#FFF9F0] text-[#382014] hover:bg-[#B8753D] hover:text-[#FFF9F0] flex items-center justify-center transition-colors text-xs font-bold shadow-sm"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans font-bold text-xs text-[#382014] min-w-[16px] text-center">
                        {quantityInCart}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-7 h-7 rounded-full bg-[#B8753D] text-[#FFF9F0] hover:bg-[#D99352] flex items-center justify-center transition-colors text-xs font-bold shadow-sm"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item.id)}
                      aria-label={`Add ${item.name} to cart for ₹${item.price}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs bg-gradient-to-r from-[#B8753D] to-[#D99352] text-[#FFF9F0] hover:shadow-[0_4px_16px_rgba(184,117,61,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-[#FFF9F0]/60 rounded-3xl border border-[#382014]/10 p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#E9D5BD] text-[#B8753D] flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#382014] mb-2">
            No items matched your search
          </h3>
          <p className="text-sm text-[#8B7461] mb-6 font-light">
            We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try exploring our all-time bestsellers or reset your filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 rounded-full bg-[#B8753D] text-[#FFF9F0] font-bold text-sm hover:bg-[#382014] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
}
