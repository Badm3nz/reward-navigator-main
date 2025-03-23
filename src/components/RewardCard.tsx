
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Star } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { cn } from '@/lib/utils';

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  category: string;
  value: number;
  currency: string;
  popularity: number;
  createdAt: string;
  isSpecialOffer?: boolean;
  userPoints?: number;
}

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  className?: string;
}

const RewardCard = ({ reward, userPoints, className }: RewardCardProps) => {
  const navigate = useNavigate();
  const isRedeemable = userPoints >= reward.points;
  
  const handleCardClick = () => {
    navigate(`/reward/${reward.id}`);
  };
  
  return (
    <div 
      className={cn(
        "reward-card animate-fade-in cursor-pointer", 
        className,
        isRedeemable ? "ring-1 ring-primary" : "",
        reward.isSpecialOffer ? "border-primary/30 bg-secondary/30" : ""
      )}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={reward.image} 
          alt={reward.title} 
          className="reward-image"
          loading="lazy"
        />
        <div className="reward-badge">
          <Trophy size={14} />
          <span>{reward.points}RP</span>
        </div>
        
        {reward.isSpecialOffer && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <Star size={12} fill="white" />
            <span>Special</span>
          </div>
        )}
      </div>
      
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2 flex-1">
            {reward.title}
          </h3>
          <div className="px-2 py-1 bg-secondary rounded-md text-xs font-medium text-primary whitespace-nowrap">
            Worth {reward.currency} {reward.value}
          </div>
        </div>
        
        <div className="text-xs sm:text-sm text-gray-600 line-clamp-2 min-h-[2rem]">
          {reward.description}
        </div>
        
        <ProgressBar 
          current={Math.min(userPoints, reward.points)} 
          total={reward.points} 
        />

        {isRedeemable && (
          <button 
            className="w-full mt-2 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            aria-label={`View details for ${reward.title}`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/reward/${reward.id}`);
            }}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default RewardCard;
