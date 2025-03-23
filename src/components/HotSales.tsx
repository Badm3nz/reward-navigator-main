
import React, { useState, useEffect } from 'react';
import { Timer, Flame } from 'lucide-react';
import RewardCard from './RewardCard';
import { Reward } from './RewardCard';

interface HotSalesProps {
  offers: Reward[];
  userPoints: number;
}

// Countdown Timer component for each hot sales card
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer flex items-center gap-1 text-xs sm:text-sm text-red-500">
      <Timer size={14} className="text-red-500" />
      <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
};

const HotSales = ({ offers, userPoints }: HotSalesProps) => {
  if (offers.length === 0) return null;

  return (
    <div className="hot-sales-section p-3 sm:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="section-title mb-0">
          <Flame className="text-primary" size={18} />
          <span>Hot Sales</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="relative">
            <RewardCard 
              reward={offer}
              userPoints={userPoints}
              className="bg-red-50/50"
            />
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              <CountdownTimer />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotSales;
