import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { mockCanteens } from '../data/mockData';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, currentCanteenId, clearCart } = useCart();

  const canteen = mockCanteens.find((c) => c.id === currentCanteenId);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-200 p-8 rounded-full inline-block mb-6">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add items from canteens to get started</p>
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

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (itemId: string, itemName: string) => {
    removeFromCart(itemId);
    toast.success(`${itemName} removed from cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#831615] mb-4 md:mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm md:text-base">Continue Shopping</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-4 md:mb-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-gray-900 text-lg md:text-2xl">Shopping Cart</h2>
                <button
                  onClick={() => {
                    clearCart();
                    toast.success('Cart cleared');
                  }}
                  className="text-gray-600 hover:text-red-600 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>

              {canteen && (
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={canteen.image}
                      alt={canteen.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-gray-900">{canteen.name}</h3>
                      <p className="text-sm text-gray-600">Delivery: {canteen.deliveryTime}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{item.menuItem.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.menuItem.category}</p>
                      <p className="text-[#831615]">₹{item.menuItem.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemove(item.menuItem.id, item.menuItem.name)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          className="text-gray-600 hover:text-[#831615] transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          className="text-gray-600 hover:text-[#831615] transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹0</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{getTotalPrice()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#831615] text-white py-3 rounded-lg hover:bg-[#6b1211] transition-colors"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Cash on Delivery available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
