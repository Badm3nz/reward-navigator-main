import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, History, Home, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { rewards } from '@/data/rewards';
import { Reward } from '@/components/RewardCard';

interface MainLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
  showSearch?: boolean;
}

const MainLayout = ({ 
  children, 
  showBackButton = true, 
  title = "REWARD POINTS", 
  showSearch = true 
}: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Reward[]>([]);
  const [selectedResult, setSelectedResult] = useState<Reward | null>(null);
  
  const userPoints = 1661.05;
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    
    const results = rewards.filter(reward => 
      reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    setSelectedResult(null);
  };
  
  const handleSearchResultClick = (reward: Reward) => {
    setSelectedResult(reward);
    setIsSearchOpen(false);
    
    toast({
      title: "Reward Selected",
      description: `You selected ${reward.title}`,
      duration: 2000,
    });
  };
  
  const handleRedeemSelectedReward = () => {
    if (!selectedResult) return;
    
    if (userPoints >= selectedResult.points) {
      toast({
        title: "Reward Redeemed!",
        description: `You have successfully redeemed ${selectedResult.title}`,
        duration: 3000,
      });
      
      setSelectedResult(null);
    } else {
      const pointsNeeded = selectedResult.points - userPoints;
      toast({
        title: "Not Enough Points",
        description: `You need ${Math.round(pointsNeeded)} more points to redeem this reward.`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background w-full overflow-x-hidden">
      <header className="bg-primary text-white py-3 sm:py-4 sticky top-0 z-50 w-full">
        <div className="md-container flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {showBackButton && (
              <Link 
                to="/" 
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft size={20} className="sm:size-24" />
              </Link>
            )}
            <h1 className="text-lg sm:text-xl font-bold tracking-wide">{title}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {showSearch && (
              <button 
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors" 
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={18} className="sm:size-20" />
              </button>
            )}
            {location.pathname !== '/history' && (
              <Link 
                to="/history" 
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors" 
                aria-label="View reward history"
              >
                <History size={18} className="sm:size-20" />
              </Link>
            )}
            {location.pathname !== '/' && (
              <Link 
                to="/" 
                className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-colors" 
                aria-label="Go to home"
              >
                <Home size={18} className="sm:size-20" />
              </Link>
            )}
          </div>
        </div>
        
        {isSearchOpen && (
          <div className="bg-white shadow-md p-3 absolute top-full left-0 right-0 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search rewards, categories..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim() === '') {
                      setSearchResults([]);
                    }
                  }}
                  className="text-black pr-8 border-primary/20"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" 
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>
            
            {searchResults.length > 0 && (
              <div className="mt-3 max-h-[60vh] overflow-y-auto bg-white rounded-md">
                <div className="text-sm text-gray-500 px-3 py-2 border-b">
                  {searchResults.length} results found
                </div>
                <div className="divide-y">
                  {searchResults.map((reward) => (
                    <div 
                      key={reward.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                      onClick={() => handleSearchResultClick(reward)}
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={reward.image} 
                          alt={reward.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{reward.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-1">{reward.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-primary">{reward.points} Points</span>
                          <span className="text-xs text-gray-500 capitalize">{reward.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {searchQuery.trim() !== '' && searchResults.length === 0 && (
              <div className="mt-3 p-4 text-center text-gray-500 bg-gray-50 rounded-md">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </header>

      {selectedResult && (
        <div className="bg-secondary/20 p-3 sm:p-4 border-b border-primary/20 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="md-container">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={selectedResult.image} 
                  alt={selectedResult.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-semibold text-sm sm:text-base line-clamp-2">{selectedResult.title}</h2>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{selectedResult.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-bold ${userPoints >= selectedResult.points ? 'text-primary' : 'text-red-500'}`}>
                        {selectedResult.points} Points
                      </span>
                      <span className="text-xs text-gray-600 capitalize">{selectedResult.category}</span>
                      
                      {userPoints < selectedResult.points && (
                        <span className="text-xs text-red-500">
                          ({Math.round(selectedResult.points - userPoints)} more needed)
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className={`px-3 py-1.5 text-white text-xs sm:text-sm font-medium rounded-md transition-colors ${
                      userPoints >= selectedResult.points 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    onClick={handleRedeemSelectedReward}
                    disabled={userPoints < selectedResult.points}
                  >
                    {userPoints >= selectedResult.points ? 'Redeem Now' : 'Not Enough Points'}
                  </button>
                </div>
                <button
                  className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedResult(null)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 md-container py-2 sm:py-4 pb-20 sm:pb-24 w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
