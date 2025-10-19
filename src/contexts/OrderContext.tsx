import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, mockOrders } from '../data/mockData';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addOrder = (order: Order) => {
    setOrders([order, ...orders]);
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  const getUserOrders = (userId: string) => {
    return orders.filter((order) => order.userId === userId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        getUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
