
import React, { useRef, useState, useEffect } from 'react';
import { Trophy, ChevronRight, Award, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import ProgressBar from './ProgressBar';

interface RewardHeaderProps {
  points: number;
  userType: string;
  className?: string;
}

const RewardHeader = ({ points, userType, className }: RewardHeaderProps) => {
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Tier definitions with thresholds and styling
  const tiers = [
    { 
      name: 'Silver', 
      minPoints: 0, 
      color: 'text-gray-400', 
      bgColor: 'bg-gray-400',
      gradient: 'from-gray-200 to-gray-400',
      icon: <Award className="w-5 h-5" />
    },
    { 
      name: 'Gold', 
      minPoints: 2000, 
      color: 'text-amber-400', 
      bgColor: 'bg-amber-400',
      gradient: 'from-amber-200 to-amber-400',
      icon: <Award className="w-5 h-5" />
    },
    { 
      name: 'Diamond', 
      minPoints: 5000, 
      color: 'text-blue-400', 
      bgColor: 'bg-blue-400',
      gradient: 'from-blue-200 to-blue-400',
      icon: <Award className="w-5 h-5" />
    }
  ];

  // Determine user's current tier
  const getUserTierIndex = (points: number) => {
    if (points >= 5000) return 2; // Diamond
    if (points >= 2000) return 1; // Gold
    return 0; // Silver
  };

  const userTierIndex = getUserTierIndex(points);
  
  // Set active tier to user's tier on component mount
  useEffect(() => {
    setActiveIndex(userTierIndex);
    
    // Scroll to user's tier on mount with a slight delay to ensure component is rendered
    setTimeout(() => {
      if (scrollRef.current) {
        const tierElement = scrollRef.current.children[userTierIndex] as HTMLElement;
        if (tierElement) {
          const scrollPosition = tierElement.offsetLeft - scrollRef.current.offsetWidth / 2 + tierElement.offsetWidth / 2;
          scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
      }
    }, 100);
  }, [userTierIndex]);
  
  // Handle navigation between tiers
  const scrollToTier = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    if (scrollRef.current) {
      const tierElement = scrollRef.current.children[index] as HTMLElement;
      if (tierElement) {
        const scrollPosition = tierElement.offsetLeft - scrollRef.current.offsetWidth / 2 + tierElement.offsetWidth / 2;
        scrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
    
    // Show toast when viewing locked tier
    if (index > userTierIndex) {
      const pointsNeeded = tiers[index].minPoints - points;
      toast({
        title: `${tiers[index].name} Tier Locked`,
        description: `You need ${Math.round(pointsNeeded)} more points to unlock this tier.`,
        duration: 3000,
      });
    }
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className={cn("pt-3 pb-4 sm:pt-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50", className)}>
      {/* Floating decorative elements */}
      <div className="absolute -left-8 top-10 w-16 h-16 rounded-full bg-primary/5"></div>
      <div className="absolute right-12 top-6 w-8 h-8 rounded-full bg-amber-300/20"></div>
      <div className="absolute right-24 top-20 w-4 h-4 rounded-full bg-blue-300/30"></div>
      
      {/* Horizontal scrollable container for tiers */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tiers.map((tier, index) => {
          const isUserTier = index === userTierIndex;
          const isLocked = index > userTierIndex;
          const nextTierPoints = index < tiers.length - 1 ? tiers[index + 1].minPoints : null;
          
          return (
            <div 
              key={tier.name}
              className={cn(
                "md-surface-elevated flex-shrink-0 w-[85%] sm:w-[70%] md:w-[60%] mx-2 first:ml-4 last:mr-4 rounded-xl relative overflow-hidden snap-center transition-all duration-500",
                isLocked ? "opacity-80" : "opacity-100",
                activeIndex === index ? "scale-100 shadow-lg" : "scale-95 shadow-md",
                activeIndex === index && "ring-2 ring-primary/20"
              )}
              onClick={() => scrollToTier(index)}
            >
              {/* Background gradient and shapes */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tier.gradient} opacity-20`}></div>
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-primary/10 blur-2xl"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-xl"></div>
              
              {/* Static sparkles for user's current tier - removed animation */}
              {isUserTier && (
                <>
                  <div className="absolute top-4 right-12 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-white rounded-full"></div>
                  <div className="absolute bottom-8 left-12 w-2 h-2 bg-white rounded-full"></div>
                </>
              )}
              
              {/* Lock overlay for locked tiers */}
              {isLocked && (
                <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
                  <Lock className="w-8 h-8 text-white mb-2" />
                  <p className="text-white font-medium">
                    {Math.round(tiers[index].minPoints - points)} points needed
                  </p>
                </div>
              )}
              
              {/* Content wrapper */}
              <div className="relative z-10 p-4 sm:p-6">
                {/* Top section */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-gray-600 font-medium text-sm sm:text-base mb-1">
                      {tier.name}
                    </h2>
                    <div className="flex items-baseline">
                      <span className="text-3xl sm:text-5xl font-bold tracking-tight">
                        {Math.round(isUserTier ? points : tier.minPoints)}
                      </span>
                      <div className={`ml-3 ${tier.color} flex items-center`}>
                        {tier.icon}
                        <span className="font-semibold ml-1">{tier.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 text-xs sm:text-sm">
                      <span className="text-gray-600">You are </span>
                      <span className="font-semibold text-primary mx-1">eSewa</span>
                      <span className="text-gray-600">{userType} user</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full ${tier.bgColor}/20`}></div>
                    <div className={`relative z-10 p-2 sm:p-3 rounded-full ${isUserTier ? 'bg-primary' : tier.bgColor} transition-all duration-300`}>
                      <Trophy className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>
                
                {/* Progress section */}
                {nextTierPoints ? (
                  <div className="mt-5 sm:mt-7">
                    <ProgressBar 
                      current={isUserTier ? points : tier.minPoints} 
                      total={nextTierPoints}
                      className={tier.bgColor}
                      showLabels
                    />
                    <div className="flex justify-between items-center text-xs sm:text-sm mt-3">
                      <div className="text-transparent">
                        {/* Empty div to maintain spacing */}
                        &nbsp;
                      </div>
                      <button 
                        className="text-xs text-primary font-medium flex items-center hover:underline transition-transform hover:translate-x-0.5 duration-300"
                        aria-label={`Learn more about ${tier.name} tier`} 
                      >
                        Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 sm:mt-7">
                    <div className="text-xs sm:text-sm text-gray-600">
                      Highest tier reached! Enjoy premium rewards.
                    </div>
                    <button 
                      className="mt-3 text-xs text-primary font-medium flex items-center hover:underline transition-transform hover:translate-x-0.5 duration-300"
                      aria-label="View exclusive diamond rewards" 
                    >
                      View exclusive rewards <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-2">
        {tiers.map((tier, index) => (
          <button
            key={`dot-${tier.name}`}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeIndex === index 
                ? `${tiers[index].bgColor} w-6` 
                : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => scrollToTier(index)}
            aria-label={`View ${tier.name} tier`}
          />
        ))}
      </div>
    </div>
  );
};

export default RewardHeader;
