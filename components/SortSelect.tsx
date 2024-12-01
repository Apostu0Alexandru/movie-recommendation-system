import React from 'react';
import { SortOption } from '@/lib/types';

interface SortSelectProps {
  onSort: (option: SortOption) => void;
}

export function SortSelect({ onSort }: SortSelectProps) {
  return (
    <div className="relative inline-block text-left">
      <select
        onChange={(e) => onSort(e.target.value as SortOption)}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="rating">Sort by Rating</option>
        <option value="year">Sort by Year</option>
        <option value="title">Sort by Title</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

