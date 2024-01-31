import { type ClassValue, clsx } from 'clsx';
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
  const hasDecimal = price % 1 !== 0;

  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  });
};
