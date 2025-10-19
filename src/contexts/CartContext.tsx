import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../data/mockData';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  currentCanteenId: string | null;
  addToCart: (item: MenuItem) => boolean;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  switchCanteen: (item: MenuItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentCanteenId, setCurrentCanteenId] = useState<string | null>(null);

  const addToCart = (item: MenuItem): boolean => {
    // Check if item is from different canteen
    if (currentCanteenId && currentCanteenId !== item.canteenId) {
      return false; // Return false to trigger confirmation modal
    }

    // Set canteen ID if first item
    if (!currentCanteenId) {
      setCurrentCanteenId(item.canteenId);
    }

    const existingItem = cartItems.find((ci) => ci.menuItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((ci) =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        )
      );
    } else {
      setCartItems([...cartItems, { menuItem: item, quantity: 1 }]);
    }
    return true;
  };

  const switchCanteen = (item: MenuItem) => {
    clearCart();
    setCurrentCanteenId(item.canteenId);
    setCartItems([{ menuItem: item, quantity: 1 }]);
  };

  const removeFromCart = (itemId: string) => {
    const newCartItems = cartItems.filter((ci) => ci.menuItem.id !== itemId);
    setCartItems(newCartItems);
    if (newCartItems.length === 0) {
      setCurrentCanteenId(null);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(
        cartItems.map((ci) =>
          ci.menuItem.id === itemId ? { ...ci, quantity } : ci
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCurrentCanteenId(null);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        currentCanteenId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        switchCanteen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
