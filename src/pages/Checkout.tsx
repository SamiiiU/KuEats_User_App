import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';
import { mockCanteens } from '../data/mockData';
import InputField from '../components/InputField';
import { ArrowLeft, MapPin, CreditCard, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { v4 as uuidv4 } from 'uuid'; // Install uuid if not already: npm install uuid

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getTotalPrice, currentCanteenId, clearCart } = useCart();
  const { addOrder , liveOrderId , setLiveOrderId } = useOrders();
  const [deliveryDepartment, setDeliveryDepartment] = useState(user?.department || '');

  const canteen = mockCanteens.find((c) => c.id === currentCanteenId);

  if (cartItems.length === 0) {
    return null;
  }
  useEffect(() => {
  if (cartItems.length === 0) {
    navigate('/cart');
  }
}, [cartItems]);

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryDepartment.trim()) {
      toast.error('Please enter delivery department');
      return;
    }

    // Prepare order data for Supabase
    const orderData = {
      id: uuidv4(),
      canteen_id: 'd9e5dbc1-526c-47d2-b3d3-9707f7f859f9',
      customer: user,
      items: cartItems, // Should be JSON serializable
      total_amount: getTotalPrice(),
      deliveryDepartment,
      status: 'pending',
      rider_status: 'reviewing',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert into Supabase
    await addOrder(orderData);

    clearCart();
    toast.success('Order placed successfully!');
    setLiveOrderId(orderData.id);
    console.log("live order id set to ", orderData.id)
    navigate(`/order-processing`);
  };

  useEffect(() => {
    console.log(liveOrderId)
    
  }, [liveOrderId])
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#831615] mb-4 md:mb-6 transition-colors text-sm md:text-base"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleConfirmOrder} className="bg-white rounded-xl shadow-md p-4 md:p-6">
              <h2 className="text-gray-900 mb-4 md:mb-6 text-lg md:text-2xl">Checkout</h2>

              {/* User Details */}
              <div className="mb-6">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <User size={20} />
                  Personal Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-1">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="mb-6">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Delivery Details
                </h3>
                <InputField
                  label="Delivery Department"
                  type="text"
                  value={deliveryDepartment}
                  onChange={setDeliveryDepartment}
                  placeholder="Enter department name"
                  required
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Payment Method
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-[#831615]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 mb-1">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#831615] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#831615]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#831615] text-white py-4 rounded-lg hover:bg-[#6b1211] transition-colors"
              >
                Confirm Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-gray-900 mb-6">Order Summary</h3>

              {canteen && (
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={canteen.image}
                      alt={canteen.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-gray-900">{canteen.name}</p>
                      <p className="text-sm text-gray-600">{canteen.deliveryTime}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between text-gray-600">
                    <span>
                      {item.menuItem.name} x {item.quantity}
                    </span>
                    <span>Rs{item.menuItem.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">Rs{getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
