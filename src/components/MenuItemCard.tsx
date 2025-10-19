import React from 'react';
import { MenuItem } from '../data/mockData';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h4 className="text-gray-900 mb-1">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-[#831615]">₹{item.price}</span>
          <button
            onClick={onAddToCart}
            className="bg-[#831615] text-white px-4 py-2 rounded-lg hover:bg-[#6b1211] transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
