import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { mockCanteens, mockMenuItems, MenuItem } from '../data/mockData';
import MenuItemCard from '../components/MenuItemCard';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../lib/supabase';

const CanteenMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, switchCanteen, currentCanteenId, cartItems } = useCart();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);

  const canteen = mockCanteens.find((c) => c.id === id);
  const menuItems = mockMenuItems.filter((item) => item.canteenId === id);

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*');
      if (error) {
        console.error('Error fetching menu items:', error);
      } else {
        setItems(data);
        console.log(data)
      }
    }
    fetchMenuItems();
  }, []);

  useEffect(() => {
    console.log("menu agaya", items)
  }, [items])
  if (!canteen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Canteen not found</h2>
          <button
            onClick={() => navigate('/home')}
            className="bg-[#831615] text-white px-6 py-3 rounded-lg hover:bg-[#6b1211] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (item: MenuItem) => {
    const success = addToCart(item);
    if (!success) {
      setPendingItem(item);
      setShowConfirmModal(true);
    } else {
      toast.success(`${item.name} added to cart`);
    }
  };

  const handleConfirmSwitch = () => {
    if (pendingItem) {
      switchCanteen(pendingItem);
      toast.success(`Switched to ${canteen.name} and added ${pendingItem.name}`);
      setPendingItem(null);
      setShowConfirmModal(false);
    }
  };

  const handleCancelSwitch = () => {
    setPendingItem(null);
    setShowConfirmModal(false);
  };

  // Group menu items by category
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Canteen Header */}
      <div className="bg-white shadow-sm sticky top-[52px] md:top-16 z-40">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#831615] mb-3 md:mb-4 transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={20} />
            Back to Canteens
          </button>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-gray-900 mb-2 text-xl md:text-3xl">{canteen.name}</h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-600 text-sm md:text-base">
                <span>Delivery: {canteen.deliveryTime}</span>
                <span className={canteen.isOpen ? 'text-green-600' : 'text-red-600'}>
                  {canteen.isOpen ? '● Open' : '● Closed'}
                </span>
              </div>
            </div>
            {cartItemCount > 0 && currentCanteenId === id && (
              <button
                onClick={() => navigate('/cart')}
                className="bg-[#831615] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-[#6b1211] transition-colors flex items-center gap-2 justify-center text-sm md:text-base w-full md:w-auto"
              >
                <ShoppingCart size={20} />
                View Cart ({cartItemCount})
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 mx-auto sm:px-12 py-6 gap-6 md:py-8 ">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-gray-900 mb-4">Switch Canteen?</h3>
            <p className="text-gray-600 mb-6">
              You can order from only one canteen at a time. Do you want to switch? This will clear your current cart.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCancelSwitch}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSwitch}
                className="flex-1 px-6 py-3 bg-[#831615] text-white rounded-lg hover:bg-[#6b1211] transition-colors"
              >
                Switch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanteenMenu;
