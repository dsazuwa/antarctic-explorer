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

export type BasicFilterOption = { displayName: string }[];

export type RangedFilterOption = {
  displayName: string;
  min: number;
  max: number;
}[];

export type ExpeditionSortType = {
  displayText: string;
  field: 'cruiseLine' | 'startingPrice' | 'name'; //  | 'departure';
  dir: 'asc' | 'desc';
};

export type FilterState = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  cruiseLines: number[];
  capactity: number;
  duration: number;
};

export type ExpeditionsState = {
  selectedItemsPerPageOption: number;
  currentPage: number;
  selectedSortOption: number;
  filters: FilterState;
};
