import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';
import { ChefHat, Bike, CheckCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';

const OrderProcessing: React.FC = () => {
  const navigate = useNavigate();
  const { getOrderById ,  liveOrderId } = useOrders();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const order = getOrderById('c51553e6-bc2e-4d9a-a0d9-fc6e5bfff92e');

  const steps = [
    {
      icon: ChefHat,
      title: 'Preparing Your Food',
      description: 'The canteen is carefully preparing your delicious meal',
      color: '#831615',
    },
    {
      icon: Bike,
      title: 'Out for Delivery',
      description: 'Your order is on the way to your department',
      color: '#831615',
    },
    {
      icon: CheckCircle,
      title: 'Delivered Successfully',
      description: 'Your order has been delivered. Enjoy your meal!',
      color: '#16a34a',
    },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 10000); // 10 seconds per step

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Order not found</h2>
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

  const handleSubmitReview = () => {
    if (rating > 0) {
      navigate('/home');
    }
  };

  const StepIcon = currentStep < steps.length ? steps[currentStep].icon : Star;
  const isCompleted = currentStep >= steps.length;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-gray-900 mb-1 text-lg md:text-2xl">Order #{order.id.slice(-6)}</h2>
              <p className="text-gray-600 text-sm md:text-base">{order.canteenName}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-gray-900 text-lg md:text-xl">Rs {order.total_amount}</p>
              <p className="text-sm text-gray-600">{order.date}</p>
            </div>
          </div>
        </div>

        {/* Main Progress Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Progress Steps Timeline */}
          <div className="bg-gradient-to-r from-[#831615] to-[#a01d1c] p-6 md:p-8">
            <div className="flex justify-between items-center max-w-md mx-auto">
              {steps.map((step, index) => {
                const StepIconItem = step.icon;
                const isActive = index === currentStep;
                const isPassed = index < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ 
                        scale: isActive ? 1.2 : isPassed ? 1 : 0.8,
                        opacity: isActive || isPassed ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`rounded-full p-3 md:p-4 ${
                        isActive 
                          ? 'bg-white' 
                          : isPassed 
                          ? 'bg-green-500' 
                          : 'bg-white/30'
                      }`}
                    >
                      <StepIconItem 
                        size={24} 
                        className={`md:w-8 md:h-8 ${
                          isActive 
                            ? 'text-[#831615]' 
                            : isPassed 
                            ? 'text-white' 
                            : 'text-white'
                        }`} 
                      />
                    </motion.div>
                    <p className="text-white text-xs mt-2 text-center hidden sm:block">
                      {step.title.split(' ')[0]}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="bg-white/30 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-white h-full"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: `${(currentStep / (steps.length - 1)) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Current Step Display */}
          {!isCompleted ? (
            <div className="p-8 md:p-12 text-center">
              <motion.div
                key={currentStep}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 15 
                }}
                className="inline-block mb-6"
              >
                <div 
                  className="p-8 md:p-10 rounded-full"
                  style={{ backgroundColor: `${steps[currentStep].color}15` }}
                >
                  <StepIcon 
                    size={80} 
                    className="md:w-24 md:h-24"
                    style={{ color: steps[currentStep].color }} 
                  />
                </div>
              </motion.div>

              <motion.h2
                key={`title-${currentStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-900 mb-4 text-2xl md:text-3xl"
              >
                {steps[currentStep].title}
              </motion.h2>

              <motion.p
                key={`desc-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-base md:text-lg mb-8"
              >
                {steps[currentStep].description}
              </motion.p>

              {/* Animated Loader */}
              <div className="flex justify-center gap-2 mb-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-[#831615] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <p className="text-gray-500 text-sm">
                Step {currentStep + 1} of {steps.length} • {(steps.length - currentStep) * 10} seconds remaining
              </p>
            </div>
          ) : (
            /* Review Section */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="inline-block mb-6"
              >
                <div className="bg-green-50 p-8 md:p-10 rounded-full">
                  <Star size={80} className="text-yellow-400 md:w-24 md:h-24" />
                </div>
              </motion.div>

              <h2 className="text-gray-900 mb-4 text-2xl md:text-3xl">Enjoy Your Meal!</h2>
              <p className="text-gray-600 mb-8 text-base md:text-lg">
                We hope you loved your food. Please share your experience!
              </p>

              <div className="max-w-md mx-auto">
                <h3 className="text-gray-900 mb-4 text-lg md:text-xl">Rate your experience</h3>
                <div className="flex justify-center gap-2 md:gap-3 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        size={36}
                        className={`md:w-12 md:h-12 ${
                          star <= rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your feedback (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#831615] focus:border-transparent mb-6 text-sm md:text-base"
                  rows={4}
                />
                <button
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                  className="w-full bg-[#831615] text-white py-3 md:py-4 rounded-lg hover:bg-[#6b1211] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-base md:text-lg"
                >
                  {rating > 0 ? 'Submit Review & Go to Home' : 'Please rate your experience'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;
