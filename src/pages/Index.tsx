import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import MainLayout from '@/layouts/MainLayout';
import RewardHeader from '@/components/RewardHeader';
import CategoryFilter from '@/components/CategoryFilter';
import SortOptions, { SortOption } from '@/components/SortOptions';
import RewardCard from '@/components/RewardCard';
import RedeemButton from '@/components/RedeemButton';
import SpecialOffers from '@/components/SpecialOffers';
import HotSales from '@/components/HotSales';
import { categories, rewards, getSpecialOffers, getRecommendedRewards } from '@/data/rewards';
import { ArrowUp, Trophy, Star } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<SortOption>('popular');
  const [filteredRewards, setFilteredRewards] = useState(rewards);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const userPoints = 1661.05;
  
  const specialOffers = getSpecialOffers(userPoints);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    let result = [...rewards];
    
    if (selectedCategory) {
      result = result.filter(reward => reward.category === selectedCategory);
    }
    
    switch (selectedSort) {
      case 'highest':
        result = result.sort((a, b) => b.points - a.points);
        break;
      case 'lowest':
        result = result.sort((a, b) => a.points - b.points);
        break;
      case 'popular':
        result = result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        result = result.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    
    setFilteredRewards(result);
  }, [selectedCategory, selectedSort]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({
      title: "Scrolled to top",
      description: "You're back at the top of the page",
      duration: 2000,
    });
  };

  const { affordable, aspirational } = getRecommendedRewards(userPoints, selectedCategory);

  const sectionTitles: Record<string, string> = {
    'electronics': 'Electronics',
    'food': 'Food & Dining',
    'cafe': 'Cafés',
    'travel': 'Travel & Leisure',
    'insurance': 'Insurance',
    'fashion': 'Fashion & Shopping',
    'entertainment': 'Entertainment',
  };

  const groupedRewards = selectedCategory
    ? { [selectedCategory]: filteredRewards }
    : filteredRewards.reduce<Record<string, typeof rewards>>((acc, reward) => {
        if (!acc[reward.category]) {
          acc[reward.category] = [];
        }
        acc[reward.category].push(reward);
        return acc;
      }, {});

  const hotSales = rewards
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map(reward => ({ ...reward, isSpecialOffer: true }));

  const specialGalaxyReward = rewards.find(reward => reward.id === '11');

  return (
    <MainLayout>
      <RewardHeader 
        points={userPoints} 
        userType="Basic" 
      />
      
      <div className="my-4 sm:my-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <SortOptions 
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </div>
        
        {!selectedCategory && (
          <HotSales offers={hotSales} userPoints={userPoints} />
        )}
        
        {!selectedCategory && (
          <SpecialOffers offers={specialOffers} userPoints={userPoints} />
        )}

        {affordable.length > 0 && (
          <div className="my-8">
            <h2 className="section-title">
              <span>Rewards You Can Get Now</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {affordable.map((reward) => (
                <RewardCard 
                  key={reward.id} 
                  reward={reward} 
                  userPoints={userPoints}
                />
              ))}
            </div>
          </div>
        )}
        
        {aspirational.length > 0 && (
          <div className="my-8">
            <h2 className="section-title">
              <span>Almost There</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Earn a few more points to unlock these rewards
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aspirational.map((reward) => (
                <RewardCard 
                  key={reward.id} 
                  reward={reward} 
                  userPoints={userPoints}
                />
              ))}
            </div>
          </div>
        )}
        
        {!selectedCategory && Object.keys(groupedRewards).length > 0 && (
          <div className="my-8">
            <h2 className="section-title">Browse by Category</h2>
            <div className="space-y-8">
              {Object.entries(groupedRewards).map(([category, categoryRewards]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {sectionTitles[category] || 'Featured Rewards'}
                    </h3>
                    {categoryRewards.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {categoryRewards.length} items
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryRewards.slice(0, 3).map((reward) => (
                      <RewardCard 
                        key={reward.id} 
                        reward={reward} 
                        userPoints={userPoints}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          
        {filteredRewards.length === 0 && (
          <div className="py-12 text-center bg-secondary/30 rounded-xl mt-8">
            <p className="text-gray-600">No rewards found for the selected filters.</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSort('popular');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {!selectedCategory && specialGalaxyReward && (
          <div className="mt-8 mb-16">
            <h2 className="section-title mb-4">
              <Star className="text-primary" size={18} />
              <span>Limited Time Offer</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <RewardCard 
                key={specialGalaxyReward.id} 
                reward={specialGalaxyReward} 
                userPoints={userPoints}
                className="shadow-lg border-2 border-primary/20"
              />
            </div>
          </div>
        )}
        
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 p-3 bg-white rounded-full shadow-lg z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="text-primary" />
          </button>
        )}
        
        <RedeemButton />
      </div>
    </MainLayout>
  );
};

export default Index;
