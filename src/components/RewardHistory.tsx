
import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { getUserRedeemedRewards } from '@/data/rewards';
import { cn } from '@/lib/utils';

const RewardHistory = () => {
  const redeemedRewards = getUserRedeemedRewards();
  
  if (redeemedRewards.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-secondary/50 text-center">
        <p className="text-gray-600">You haven't redeemed any rewards yet.</p>
        <p className="text-sm text-primary mt-2">Explore rewards and start redeeming!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {redeemedRewards.map((item) => (
        <div 
          key={item.id}
          className="md-surface p-4 flex gap-4 animate-fade-in"
        >
          <img 
            src={item.reward?.image}
            alt={item.reward?.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-medium">
                {item.reward?.title}
              </h3>
              <StatusBadge status={item.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Redeemed: {format(new Date(item.redeemedOn), 'MMM d, yyyy')}
            </p>
            <div className="mt-2 text-sm font-medium text-primary">
              {item.reward?.points} Points
            </div>
            <button className="mt-2 text-sm text-primary flex items-center hover:underline">
              View details <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
        status === 'completed' 
          ? "bg-green-100 text-green-700" 
          : "bg-amber-100 text-amber-700"
      )}
    >
      {status === 'completed' ? (
        <>
          <CheckCircle size={12} />
          <span>Completed</span>
        </>
      ) : (
        <>
          <Clock size={12} />
          <span>Processing</span>
        </>
      )}
    </div>
  );
};

export default RewardHistory;
