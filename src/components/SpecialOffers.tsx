
import React from 'react';
import { Sparkles } from 'lucide-react';
import RewardCard from './RewardCard';
import { Reward } from './RewardCard';

interface SpecialOffersProps {
  offers: Reward[];
  userPoints: number;
}

const SpecialOffers = ({ offers, userPoints }: SpecialOffersProps) => {
  if (offers.length === 0) return null;
  
  return (
    <div className="special-offers-section p-3 sm:p-6">
      <h2 className="section-title mb-2 sm:mb-4">
        <Sparkles className="text-primary" size={18} />
        <span>Recommended for You</span>
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
        Special offers based on your points balance
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {offers.map((offer) => (
          <RewardCard 
            key={offer.id} 
            reward={offer} 
            userPoints={userPoints}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
