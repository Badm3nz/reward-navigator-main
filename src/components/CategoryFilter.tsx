
import React from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = {
  id: string;
  name: string;
};

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryFilterProps) => {
  
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={16} className="text-gray-500" />
        <h3 className="text-sm font-medium text-gray-500">Categories</h3>
      </div>
      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          <button
            className={cn(
              "category-chip", 
              selectedCategory === null ? "active" : ""
            )}
            onClick={() => onSelectCategory(null)}
            aria-pressed={selectedCategory === null}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={cn(
                "category-chip", 
                selectedCategory === category.id ? "active" : ""
              )}
              onClick={() => onSelectCategory(category.id)}
              aria-pressed={selectedCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
