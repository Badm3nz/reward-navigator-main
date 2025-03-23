
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import RewardHistoryComponent from '@/components/RewardHistory';

const RewardHistoryPage = () => {
  return (
    <MainLayout title="MY REWARDS" showSearch={false}>
      <div className="pt-6">
        <h1 className="text-2xl font-bold mb-6 text-primary">Reward History</h1>
        <RewardHistoryComponent />
        
        <div className="mt-10 p-6 rounded-xl bg-secondary/50">
          <h2 className="text-lg font-semibold mb-4">About Reward Points</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>Reward points are earned through eSewa transactions and can be redeemed for various products and services.</p>
            <p>Points usually expire after 12 months from the date of issue. Be sure to check expiration dates!</p>
            <p>For any questions about your reward points, contact our customer support.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RewardHistoryPage;
