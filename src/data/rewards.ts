import { Reward } from '@/components/RewardCard';

export const categories = [
  { id: 'food', name: 'Food' },
  { id: 'cafe', name: 'Café' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'travel', name: 'Travel' },
  { id: 'insurance', name: 'Insurance' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'entertainment', name: 'Entertainment' },
];

export const rewards: Reward[] = [
  {
    id: '1',
    title: 'Claim your free Ultima Boom 311 TWS Earbuds',
    description: 'Enjoy superior sound quality with these premium wireless earbuds.',
    points: 7680,
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=2070&auto=format&fit=crop',
    category: 'electronics',
    value: 4500,
    currency: 'NPR',
    popularity: 92,
    createdAt: '2023-12-15T09:30:00Z',
  },
  {
    id: '2',
    title: 'Enjoy 18 Free Grilled Hot Wings!',
    description: 'Treat yourself to delicious hot wings at Chicken Station.',
    points: 5994,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=2053&auto=format&fit=crop',
    category: 'food',
    value: 900,
    currency: 'NPR',
    popularity: 87,
    createdAt: '2024-01-05T12:15:00Z',
  },
  {
    id: '3',
    title: 'Get Your BAJEKO Voucher',
    description: 'Exclusive voucher for dining at BAJEKO restaurant.',
    points: 4500,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    category: 'food',
    value: 750,
    currency: 'NPR',
    popularity: 76,
    createdAt: '2024-01-10T10:45:00Z',
  },
  {
    id: '4',
    title: 'eSewa Care Insurance Coverage',
    description: 'Get accident coverage with Rs. 2,30,000 protection.',
    points: 1800,
    image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=2072&auto=format&fit=crop',
    category: 'insurance',
    value: 2300,
    currency: 'NPR',
    popularity: 65,
    createdAt: '2024-02-01T08:20:00Z',
    isSpecialOffer: true,
  },
  {
    id: '5',
    title: 'Himalayan Java Coffee Voucher',
    description: 'Enjoy a premium coffee experience at Himalayan Java.',
    points: 2500,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    category: 'cafe',
    value: 500,
    currency: 'NPR',
    popularity: 85,
    createdAt: '2024-02-05T14:30:00Z',
  },
  {
    id: '6',
    title: 'Weekend Getaway to Pokhara',
    description: 'Two-day trip to beautiful Pokhara with accommodation included.',
    points: 12000,
    image: 'https://images.unsplash.com/photo-1575483293997-8a0e2f15faaa?q=80&w=2070&auto=format&fit=crop',
    category: 'travel',
    value: 8000,
    currency: 'NPR',
    popularity: 78,
    createdAt: '2024-02-10T11:45:00Z',
  },
  {
    id: '7',
    title: 'Samsung Galaxy A23 Discount Voucher',
    description: 'Get 15% off on the new Samsung Galaxy A23 smartphone.',
    points: 9500,
    image: 'https://images.unsplash.com/photo-1581993192008-63e896f4f744?q=80&w=2073&auto=format&fit=crop',
    category: 'electronics',
    value: 6000,
    currency: 'NPR',
    popularity: 90,
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    id: '8',
    title: 'Big Mart Shopping Voucher',
    description: 'Shop your favorite items at Big Mart with this exclusive voucher.',
    points: 3200,
    image: 'https://images.unsplash.com/photo-1608031438839-9731ed733bf1?q=80&w=2074&auto=format&fit=crop',
    category: 'fashion',
    value: 1000,
    currency: 'NPR',
    popularity: 72,
    createdAt: '2024-02-15T13:20:00Z',
    isSpecialOffer: true,
  },
  {
    id: '9',
    title: 'QFX Cinema Movie Pass',
    description: 'Enjoy any movie of your choice at QFX Cinemas.',
    points: 2800,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop',
    category: 'entertainment',
    value: 700,
    currency: 'NPR',
    popularity: 88,
    createdAt: '2024-02-20T15:10:00Z',
  },
  {
    id: '10',
    title: 'KFC Bucket Meal Voucher',
    description: 'Treat yourself to a delicious KFC bucket meal.',
    points: 4000,
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2070&auto=format&fit=crop',
    category: 'food',
    value: 1200,
    currency: 'NPR',
    popularity: 91,
    createdAt: '2024-01-25T12:30:00Z',
    isSpecialOffer: true,
  },
  {
    id: '11',
    title: 'Samsung Galaxy A23 Discount Voucher',
    description: 'Get 15% off on the new Samsung Galaxy A23 smartphone.',
    points: 1500,
    image: 'https://images.unsplash.com/photo-1581993192008-63e896f4f744?q=80&w=2073&auto=format&fit=crop',
    category: 'electronics',
    value: 6000,
    currency: 'NPR',
    popularity: 95,
    createdAt: '2024-03-01T10:00:00Z',
    isSpecialOffer: true,
  },
];

export const redeemHistory = [
  {
    id: 'h1',
    rewardId: '2',
    redeemedOn: '2023-12-20T14:45:00Z',
    status: 'completed',
  },
  {
    id: 'h2',
    rewardId: '5',
    redeemedOn: '2024-01-05T11:30:00Z',
    status: 'completed',
  },
  {
    id: 'h3',
    rewardId: '9',
    redeemedOn: '2024-02-10T18:15:00Z',
    status: 'processing',
  },
];

export const getUserRedeemedRewards = () => {
  return redeemHistory.map(history => {
    const reward = rewards.find(r => r.id === history.rewardId);
    return {
      ...history,
      reward
    };
  });
};

export const getSpecialOffers = (userPoints: number) => {
  // First get offers marked as special offers
  let offers = rewards.filter(reward => reward.isSpecialOffer);
  
  // Also add rewards that are closest to user's points (within 20% more)
  const pointThreshold = userPoints * 1.2;
  const affordableRewards = rewards
    .filter(reward => !reward.isSpecialOffer && reward.points <= pointThreshold)
    .sort((a, b) => b.points - a.points)
    .slice(0, 2);
  
  return [...offers, ...affordableRewards].slice(0, 3);
};

export const getRecommendedRewards = (userPoints: number, category: string | null = null) => {
  let filtered = rewards;
  
  if (category) {
    filtered = filtered.filter(reward => reward.category === category);
  }
  
  // Get rewards that user can afford
  const affordable = filtered.filter(reward => reward.points <= userPoints);
  
  // Get rewards that are just above user's points (aspirational)
  const aspirational = filtered
    .filter(reward => reward.points > userPoints && reward.points <= userPoints * 1.5)
    .sort((a, b) => a.points - b.points);
  
  return {
    affordable,
    aspirational: aspirational.slice(0, 3)
  };
};
