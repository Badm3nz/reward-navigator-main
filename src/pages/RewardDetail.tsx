
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Clock, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import MainLayout from '@/layouts/MainLayout';
import ProgressBar from '@/components/ProgressBar';
import { Button } from "@/components/ui/button";
import { rewards } from '@/data/rewards';

const RewardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  
  // Mock user points - in a real app, this would come from a context or API
  const userPoints = 1661.05;
  
  const reward = rewards.find(r => r.id === id);
  
  if (!reward) {
    return (
      <MainLayout title="Reward Not Found">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertTriangle size={48} className="text-amber-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Reward Not Found</h2>
          <p className="text-gray-600 mb-6">The reward you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>
            Back to Rewards
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const isRedeemable = userPoints >= reward.points;
  
  const handleRedeem = () => {
    if (!isRedeemable) {
      toast({
        title: "Not Enough Points",
        description: `You need ${Math.round(reward.points - userPoints)} more points to redeem this reward.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsRedeeming(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false);
      setIsRedeemed(true);
      
      toast({
        title: "Redemption Successful!",
        description: `You've successfully redeemed ${reward.title}`,
      });
    }, 1500);
  };
  
  return (
    <MainLayout 
      title="Reward Details" 
      showBackButton={true}
      showSearch={false}
    >
      <div className="flex flex-col gap-6 py-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to rewards</span>
        </button>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="h-48 sm:h-64 md:h-80 relative">
            <img 
              src={reward.image} 
              alt={reward.title} 
              className="w-full h-full object-cover"
            />
            {reward.isSpecialOffer && (
              <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Trophy size={14} className="shrink-0" />
                <span>Special Offer</span>
              </div>
            )}
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold">{reward.title}</h1>
              <div className="px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium">
                Worth {reward.currency} {reward.value}
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{reward.description}</p>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-primary" />
                    <span className="font-semibold">{reward.points} Points Required</span>
                  </div>
                  <span className={`text-sm font-medium ${isRedeemable ? 'text-green-600' : 'text-red-500'}`}>
                    {isRedeemable 
                      ? 'You have enough points!' 
                      : `Need ${Math.round(reward.points - userPoints)} more points`}
                  </span>
                </div>
                
                <ProgressBar 
                  current={Math.min(userPoints, reward.points)} 
                  total={reward.points} 
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Your Current Points</span>
                  <span className="font-semibold">{userPoints.toLocaleString()} RP</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points After Redemption</span>
                  <span className="font-semibold">{Math.max(0, userPoints - reward.points).toLocaleString()} RP</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Category</span>
                  <span className="font-medium capitalize">{reward.category}</span>
                </div>
              </div>
              
              {isRedeemed ? (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                  <div>
                    <h3 className="font-medium text-green-700">Successfully Redeemed!</h3>
                    <p className="text-sm text-green-600">Your reward has been added to your account</p>
                  </div>
                </div>
              ) : (
                <Button 
                  className="w-full py-6 text-base"
                  onClick={handleRedeem}
                  disabled={!isRedeemable || isRedeeming}
                >
                  {isRedeeming ? (
                    <>
                      <Clock size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : isRedeemable ? (
                    'Redeem Now'
                  ) : (
                    'Not Enough Points'
                  )}
                </Button>
              )}
              
              {isRedeemed && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/history')}
                >
                  View My Rewards
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mt-4">
          <h3 className="font-medium text-gray-700 mb-1">Terms & Conditions</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>This reward is valid for 30 days from the date of redemption.</li>
            <li>The reward cannot be exchanged for cash or combined with other offers.</li>
            <li>The company reserves the right to modify or cancel this offer at any time.</li>
            <li>For assistance with your reward, please contact customer support.</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default RewardDetail;
