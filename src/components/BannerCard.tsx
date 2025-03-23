
import React from 'react';
import { Gift, ChevronRight, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BannerCardProps {
  title: string;
  description: string;
  pointsRequired: number;
  userPoints: number;
  color?: string;
  isFullWidth?: boolean;
}

const BannerCard = ({ 
  title, 
  description, 
  pointsRequired, 
  userPoints,
  color = "bg-primary",
  isFullWidth = false
}: BannerCardProps) => {
  const { toast } = useToast();
  const isRedeemable = userPoints >= pointsRequired;
  
  const handleRedeemClick = () => {
    if (isRedeemable) {
      toast({
        title: "Special Reward Redeemed!",
        description: `You have successfully redeemed ${title}`,
        duration: 3000,
      });
    } else {
      const pointsNeeded = pointsRequired - userPoints;
      toast({
        title: "Not Enough Points",
        description: `You need ${Math.round(pointsNeeded)} more points to redeem this reward.`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className={`${color} rounded-lg overflow-hidden shadow-md p-4 sm:p-6 text-white my-4 animate-fade-in ${isFullWidth ? 'w-full' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} className="text-yellow-300" />
            <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
          </div>
          <p className="text-sm opacity-90 mb-3">{description}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <Gift size={18} />
            <span className="font-semibold">{pointsRequired} RP Required</span>
          </div>
          
          <button
            onClick={handleRedeemClick}
            disabled={!isRedeemable}
            className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isRedeemable 
                ? 'bg-white text-primary hover:bg-opacity-90' 
                : 'bg-white/30 cursor-not-allowed'
            }`}
          >
            {isRedeemable ? 'Redeem Special Offer' : `Need ${Math.round(pointsRequired - userPoints)} more points`}
            <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="hidden sm:flex items-center justify-center bg-white/20 rounded-full p-4 h-24 w-24">
          <span className="text-2xl font-bold">{pointsRequired}</span>
          <span className="text-sm">RP</span>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
