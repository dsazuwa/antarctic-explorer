import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
// import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // return twMerge(clsx(inputs));
  return clsx(inputs);
}

export const toggleIndex = (index: number, selectedIndices: number[]) =>
  selectedIndices.includes(index)
    ? selectedIndices.filter((i) => i !== index)
    : [...selectedIndices, index];

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
};

export const formatDate = (
  date: Date,
  formatStr: 'yyyy-MM-dd' | 'LLL dd, y',
) => {
  return format(date, formatStr);
};
