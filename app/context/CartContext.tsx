"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, Product } from "../data/cafeData";

interface CartContextType {
  cart: Record<string, number>;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  placedOrderNumber: string | null;
  setPlacedOrderNumber: (num: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("brewtoria-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          setCart(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("brewtoria-cart", JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (productId: string, quantity = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setCart((prev) => {
      const current = prev[productId] || 0;
      const nextCount = current + quantity;
      return { ...prev, [productId]: nextCount };
    });
    if (product) {
      showToast(`Added ${quantity > 1 ? `${quantity}x ` : ""}${product.name} to cart`);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const nextCount = current + delta;
      if (nextCount <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: nextCount };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const cartCount = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  const cartSubtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = PRODUCTS.find((p) => p.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isReservationOpen,
        setIsReservationOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
        placedOrderNumber,
        setPlacedOrderNumber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
