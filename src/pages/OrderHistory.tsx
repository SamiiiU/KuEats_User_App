import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrderContext';
import { useCart } from '../contexts/CartContext';
import OrderCard from '../components/OrderCard';
import { ArrowLeft, Package } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserOrders } = useOrders();
  const { addToCart, switchCanteen, currentCanteenId } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const userOrders = getUserOrders(user!.id);

  const handleViewDetails = (orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  };

  const handleReorder = (orderId: string) => {
    const order = userOrders.find((o) => o.id === orderId);
    if (!order) return;

    // Check if different canteen
    if (currentCanteenId && currentCanteenId !== order.canteenId) {
      const confirmed = window.confirm(
        'You can order from only one canteen at a time. Do you want to switch? This will clear your current cart.'
      );
      if (!confirmed) return;
    }

    // Add all items to cart
    if (currentCanteenId !== order.canteenId) {
      switchCanteen(order.items[0].menuItem);
      // Add remaining items
      for (let i = 1; i < order.items.length; i++) {
        for (let j = 0; j < order.items[i].quantity; j++) {
          addToCart(order.items[i].menuItem);
        }
      }
      // Add quantity for first item
      for (let j = 1; j < order.items[0].quantity; j++) {
        addToCart(order.items[0].menuItem);
      }
    } else {
      order.items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          addToCart(item.menuItem);
        }
      });
    }

    toast.success('Items added to cart');
    navigate('/cart');
  };

  const selectedOrderData = userOrders.find((o) => o.id === selectedOrder);

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-200 p-8 rounded-full inline-block mb-6">
            <Package size={64} className="text-gray-400" />
          </div>
          <h2 className="text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start ordering from your favorite canteens</p>
          <button
            onClick={() => navigate('/home')}
            className="bg-[#831615] text-white px-8 py-3 rounded-lg hover:bg-[#6b1211] transition-colors"
          >
            Browse Canteens
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#831615] mb-4 md:mb-6 transition-colors text-sm md:text-base"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <h1 className="text-gray-900 mb-6 md:mb-8 text-xl md:text-3xl">Order History</h1>

        <div className="grid grid-cols-1 gap-6">
          {userOrders.map((order) => (
            <div key={order.id}>
              <OrderCard
                order={order}
                onViewDetails={() => handleViewDetails(order.id)}
                onReorder={() => handleReorder(order.id)}
              />

              {/* Order Details Expansion */}
              {selectedOrder === order.id && selectedOrderData && (
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mt-4 border-l-4 border-[#831615]">
                  <h3 className="text-gray-900 mb-4 text-base md:text-lg">Order Details</h3>
                  <div className="space-y-4">
                    {selectedOrderData.items.map((item) => (
                      <div
                        key={item.menuItem.id}
                        className="flex gap-4 items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-gray-900">{item.menuItem.name}</p>
                          <p className="text-sm text-gray-600">{item.menuItem.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">x {item.quantity}</p>
                          <p className="text-[#831615]">₹{item.menuItem.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Delivery Department:</span>
                      <span className="text-gray-900">{selectedOrderData.deliveryDepartment}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="text-gray-900">{selectedOrderData.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-900">Total Amount:</span>
                      <span className="text-gray-900">₹{selectedOrderData.totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
