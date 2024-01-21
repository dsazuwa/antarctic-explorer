export type TCruiseLine = {
  id: number;
  name: string;
  website: string;
  expeditionWebsite: string;
  logo: string;
};

export type TCruiseLineWithExpeditions = TCruiseLine & {
  expeditions: TExpedition[];
};

export type TCruiseLines = {
  [key: string]: TCruiseLine;
};

export type TExpedition = {
  id: number;
  cruiseLine: string;
  website: string;
  name: string;
  description: string;
  departingFrom: string;
  arrivingAt: string;
  duration: string;
  startingPrice: number | null;
  photoUrl: string;
};

export type TCruiseLinesAndExpeditions = {
  expeditions: TExpedition[];
  cruiseLines: TCruiseLines;
};

export type ExpeditionSortType = {
  displayText: string;
  field: 'cruiseLine' | 'startingPrice' | 'name'; //  | 'departure';
  dir: 'asc' | 'desc';
};

export const sortOptions: ExpeditionSortType[] = [
  // {
  //   displayText: 'Departure Date (near to far)',
  //   field: 'departure',
  //   dir: 'asc',
  // },
  // {
  //   displayText: 'Departure Date (far to near)',
  //   field: 'departure',
  //   dir: 'desc',222222
  // },
  {
    displayText: 'Cruiselines (A-Z)',
    field: 'cruiseLine',
    dir: 'asc',
  },
  {
    displayText: 'Cruiselines (Z-A)',
    field: 'cruiseLine',
    dir: 'desc',
  },
  {
    displayText: 'Price (low to high)',
    field: 'startingPrice',
    dir: 'asc',
  },
  {
    displayText: 'Price (high to low)',
    field: 'startingPrice',
    dir: 'desc',
  },
  {
    displayText: 'Name (A-Z)',
    field: 'name',
    dir: 'asc',
  },
  {
    displayText: 'Name (Z-A)',
    field: 'name',
    dir: 'desc',
  },
];
