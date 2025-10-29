import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order } from '../data/mockData';
import { supabase } from '../lib/supabase'; // Adjust path as needed

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [liveOrderId , setLiveOrderId] = useState<string | null>(null);

  // Fetch orders from Supabase on mount
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*');
      if (!error && data) {
        setOrders(data as Order[]);
      }
    };
    fetchOrders();
  }, []);

  // Add order to Supabase
  const addOrder = async (order: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select();
    if (!error && data) {
      setOrders([data[0] as Order, ...orders]);
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer->>id', userId); // JSON column filter
  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
  return data as Order[];
};


  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        getUserOrders,
        liveOrderId , setLiveOrderId
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
