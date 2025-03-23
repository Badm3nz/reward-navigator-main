
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabels?: boolean;
}

const ProgressBar = ({ 
  current, 
  total, 
  className, 
  showLabels = true 
}: ProgressBarProps) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  const remainingPoints = total - current > 0 ? total - current : 0;
  
  return (
    <div className="space-y-1.5">
      <div 
        className="progress-bar-container h-2 bg-gray-200 rounded-full w-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className={cn("progress-bar h-full transition-all duration-700 ease-in-out", className || "bg-primary")}
          style={{ width: `${percentage}%` }}
          data-percentage={percentage}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>{Math.round(current)} points</span>
          {remainingPoints > 0 ? (
            <span>{Math.round(remainingPoints)} points more needed</span>
          ) : (
            <span>Ready to redeem!</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
