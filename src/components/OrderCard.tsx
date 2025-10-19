import React from 'react';
import { Order } from '../data/mockData';
import { Calendar, MapPin, CreditCard } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onViewDetails: () => void;
  onReorder: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails, onReorder }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1 text-base md:text-lg">{order.canteenName}</h3>
          <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
            <Calendar size={14} className="md:w-4 md:h-4" />
            <span>{order.date}</span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap ${
            order.status === 'Delivered'
              ? 'bg-green-100 text-green-700'
              : order.status === 'Cancelled'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
          <MapPin size={14} className="md:w-4 md:h-4" />
          <span>{order.deliveryDepartment}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm">
          <CreditCard size={14} className="md:w-4 md:h-4" />
          <span>{order.paymentMethod}</span>
        </div>
      </div>

      <div className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <span className="text-gray-900 text-base md:text-lg">
          Total: ₹{order.totalPrice}
        </span>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onViewDetails}
            className="px-4 py-2 border border-[#831615] text-[#831615] rounded-lg hover:bg-[#831615] hover:text-white transition-colors text-sm md:text-base"
          >
            View Details
          </button>
          <button
            onClick={onReorder}
            className="px-4 py-2 bg-[#831615] text-white rounded-lg hover:bg-[#6b1211] transition-colors text-sm md:text-base"
          >
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
