import { ExpeditionSortType, RangedFilterOption } from './type';

export const itemsPerPageOptions = [5, 10, 15, 20];

export const durationOptions: RangedFilterOption = [
  { displayName: '1 - 7 days', min: 1, max: 7 },
  { displayName: '8 - 14 days', min: 8, max: 14 },
  { displayName: '15 - 21 days', min: 15, max: 21 },
  { displayName: '22+ days', min: 22, max: 1000 },
  { displayName: 'All', min: 0, max: 1000 },
];

export const capacityOptions: RangedFilterOption = [
  { displayName: '1 - 100', min: 1, max: 100 },
  { displayName: '100 - 200', min: 100, max: 200 },
  { displayName: '200 - 500', min: 200, max: 500 },
  { displayName: '500+', min: 500, max: 1000 },
  { displayName: 'All', min: 0, max: 1000 },
];

export const sortOptions: ExpeditionSortType[] = [
  {
    displayText: 'Cruiselines (A-Z)',
    sort: 'cruiseLine',
    dir: 'asc',
  },
  {
    displayText: 'Cruiselines (Z-A)',
    sort: 'cruiseLine',
    dir: 'desc',
  },

  // {
  //   displayText: 'Departure Date (near to far)',
  //   sort: 'departure',
  //   dir: 'asc',
  // },
  // {
  //   displayText: 'Departure Date (far to near)',
  //   sort: 'departure',
  //   dir: 'desc',222222
  // },

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
    displayText: 'Price (low to high)',
    sort: 'startingPrice',
    dir: 'asc',
  },
  {
    displayText: 'Price (high to low)',
    sort: 'startingPrice',
    dir: 'desc',
  },
];
