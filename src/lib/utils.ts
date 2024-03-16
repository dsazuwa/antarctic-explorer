import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
};

export const formatDate = (
  date: Date | string,
  formatStr: 'yyyy-MM-dd' | 'LLL dd, y' | 'LLL y',
) => {
  return format(date, formatStr);
};
