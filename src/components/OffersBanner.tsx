import React, { useState, useEffect } from 'react';
import { mockOffers } from '../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OffersBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockOffers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockOffers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockOffers.length) % mockOffers.length);
  };

  return (
    <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden group">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {mockOffers.map((offer) => (
          <div
            key={offer.id}
            className="min-w-full h-full relative"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6 md:px-12">
              <h3 className="text-white mb-2 text-base md:text-xl">{offer.title}</h3>
              <p className="text-white/90 text-sm md:text-base">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {mockOffers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersBanner;
