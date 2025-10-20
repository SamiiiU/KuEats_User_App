import React , {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import OffersBanner from '../components/OffersBanner';
import CanteenCard from '../components/CanteenCard';
import { mockCanteens } from '../data/mockData';
import { History, Sparkles } from 'lucide-react';
import { ContextAPI } from '../GlobalProvider/ContextAPI';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {scrwidth} = useContext(ContextAPI)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#831615] to-[#a01d1c] text-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={24} className="md:w-7 md:h-7" />
              <h1 className="text-white text-xl md:text-3xl">Welcome, {user?.name}! </h1>
            </div>
            <p className="text-base md:text-xl text-white/90">
              Order your favorite meals from campus canteens and get them delivered to your department
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Offers Section */}
        <section className="mb-8 md:mb-12">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-gray-900 text-lg md:text-2xl">Special Offers</h2>
          </div>
          <OffersBanner />
        </section>

        {/* Quick Actions */}
        <section className="mb-8 md:mb-12">
          <button
            onClick={() => navigate('/history')}
            className="w-full bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="bg-[#831615] p-2 md:p-3 rounded-lg">
                <History size={24} className="text-white md:w-7 md:h-7" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-900 text-base md:text-lg">Order History</h3>
                <p className="text-gray-600 text-sm md:text-base">View your past orders and reorder</p>
              </div>
            </div>
            <div className="text-[#831615] group-hover:translate-x-2 transition-transform text-xl">
              →
            </div>
          </button>
        </section>

        {/* Canteens Section */}
        <section>
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-gray-900 text-lg md:text-2xl">Available Canteens</h2>
            <p className="text-gray-600 text-sm md:text-base">{mockCanteens.filter(c => c.isOpen).length} open now</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mockCanteens.map((canteen) => (
              <CanteenCard
                key={canteen.id}
                canteen={canteen}
                onClick={() => navigate(`/canteen/${canteen.id}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
