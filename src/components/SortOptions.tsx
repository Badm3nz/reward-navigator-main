
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Trophy, Clock, Filter } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type SortOption = 
  | 'highest' 
  | 'lowest' 
  | 'popular' 
  | 'newest';

interface SortOptionsProps {
  selectedSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortOptions = ({ selectedSort, onSortChange }: SortOptionsProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: SortOption) => {
    onSortChange(value);
    setOpen(false);
  };

  const getSortIcon = () => {
    switch (selectedSort) {
      case 'highest':
        return <ArrowDown size={16} />;
      case 'lowest':
        return <ArrowUp size={16} />;
      case 'popular':
        return <Trophy size={16} />;
      case 'newest':
        return <Clock size={16} />;
      default:
        return <Filter size={16} />;
    }
  };

  const getSortLabel = () => {
    switch (selectedSort) {
      case 'highest':
        return 'Highest Points';
      case 'lowest':
        return 'Lowest Points';
      case 'popular':
        return 'Most Popular';
      case 'newest':
        return 'Newest';
      default:
        return 'Sort By';
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className="flex items-center gap-2 text-sm font-medium md-chip active bg-primary text-white"
          aria-label="Sort rewards"
          aria-haspopup="true"
          aria-expanded={open}
        >
          {getSortIcon()}
          <span>{getSortLabel()}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 animate-scale-in rounded-xl" align="end" sideOffset={5}>
        <RadioGroup 
          value={selectedSort} 
          className="gap-0 rounded-xl overflow-hidden"
        >
          {[
            { value: 'highest', label: 'Highest to Lowest', icon: ArrowDown },
            { value: 'lowest', label: 'Lowest to Highest', icon: ArrowUp },
            { value: 'popular', label: 'Most Popular', icon: Trophy },
            { value: 'newest', label: 'Newest', icon: Clock }
          ].map((option) => (
            <div 
              key={option.value} 
              className="flex items-center hover:bg-gray-50 px-3 py-2.5 cursor-pointer"
              onClick={() => handleSelect(option.value as SortOption)}
            >
              <RadioGroupItem 
                value={option.value} 
                id={option.value} 
                className="mr-3"
              />
              <option.icon size={16} className="mr-2 text-gray-500" />
              <Label htmlFor={option.value} className="cursor-pointer flex-1">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};

export default SortOptions;
