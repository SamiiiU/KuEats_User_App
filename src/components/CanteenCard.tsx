import React from 'react';
import { Canteen } from '../data/mockData';
import { Clock, MapPin } from 'lucide-react';

interface CanteenCardProps {
  canteen: Canteen;
  onClick: () => void;
}

const CanteenCard: React.FC<CanteenCardProps> = ({ canteen, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 duration-300"
    >
      <div className="relative h-48">
        <img
          src={canteen.image}
          alt={canteen.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-sm text-white ${
              canteen.isOpen ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {canteen.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 mb-3">{canteen.name}</h3>
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{canteen.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>Campus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanteenCard;
