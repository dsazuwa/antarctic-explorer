import { ExpeditionSortType, RangedFilterOption } from './type';

export const itemsPerPageOptions = [6, 12, 18, 24];
export const departuresPerPageOptions = [5, 10, 15, 20];

export const durationOptions: RangedFilterOption = [
  { displayName: '1 - 7 days', min: 1, max: 7 },
  { displayName: '8 - 14 days', min: 8, max: 14 },
  { displayName: '15 - 21 days', min: 15, max: 21 },
  { displayName: '22+ days', min: 22, max: 2147483647 },
  { displayName: 'All', min: 0, max: 2147483647 },
];

export const capacityOptions: RangedFilterOption = [
  { displayName: '1 - 100', min: 1, max: 100 },
  { displayName: '100 - 200', min: 100, max: 200 },
  { displayName: '200 - 500', min: 200, max: 500 },
  { displayName: '500+', min: 500, max: 2147483647 },
  { displayName: 'All', min: 0, max: 2147483647 },
];

export const sortOptions: ExpeditionSortType[] = [
  {
    displayText: 'Date (Upcoming to Later)',
    sort: 'nearestDate',
    dir: 'asc',
  },
  {
    displayText: 'Date (Later to Upcoming)',
    sort: 'nearestDate',
    dir: 'desc',
  },
  {
    displayText: 'Name (A-Z)',
    sort: 'name',
    dir: 'asc',
  },
  {
    displayText: 'Name (Z-A)',
    sort: 'name',
    dir: 'desc',
  },
  {
    displayText: 'Price (Low to High)',
    sort: 'startingPrice',
    dir: 'asc',
  },
  {
    displayText: 'Price (High to Low)',
    sort: 'startingPrice',
    dir: 'desc',
  },
];

export const departuresSortOption: ExpeditionSortType[] = [
  {
    displayText: 'Date (Upcoming to Later)',
    sort: 'nearestDate',
    dir: 'asc',
  },
  {
    displayText: 'Date (Later to Upcoming)',
    sort: 'nearestDate',
    dir: 'desc',
  },
  {
    displayText: 'Price (Low to High)',
    sort: 'startingPrice',
    dir: 'asc',
  },
  {
    displayText: 'Price (High to Low)',
    sort: 'startingPrice',
    dir: 'desc',
  },
];
