import {
  BasicFilterOption,
  DepartureSortType,
  ExpeditionSortType,
  RangedFilterOption,
} from './type';

export const itemsPerPageOptions = [6, 12, 18, 24];
export const departuresPerPageOptions = [5, 10, 15, 20];

export const durationOptions: (BasicFilterOption | RangedFilterOption)[] = [
  { displayText: '1 - 7 days', min: 1, max: 7 },
  { displayText: '8 - 14 days', min: 8, max: 14 },
  { displayText: '15 - 21 days', min: 15, max: 21 },
  { displayText: '22+ days', min: 22 },
  { displayText: 'All' },
];

export const capacityOptions: (BasicFilterOption | RangedFilterOption)[] = [
  { displayText: '1 - 100', min: 1, max: 100 },
  { displayText: '100 - 200', min: 100, max: 200 },
  { displayText: '200 - 500', min: 200, max: 500 },
  { displayText: '500+', min: 500 },
  { displayText: 'All' },
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

export const departureSortOptions: DepartureSortType[] = [
  {
    displayText: 'Date (Upcoming to Later)',
    sort: 'startDate',
    dir: 'asc',
  },
  {
    displayText: 'Date (Later to Upcoming)',
    sort: 'startDate',
    dir: 'desc',
  },
  {
    displayText: 'Price (Low to High)',
    sort: 'price',
    dir: 'asc',
  },
  {
    displayText: 'Price (High to Low)',
    sort: 'price',
    dir: 'desc',
  },
];
