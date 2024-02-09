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
  nearestDate: string | null;
  startingPrice: number | null;
  photoUrl: string;
};

export type ExpeditionsResponse = {
  data: TExpedition[];
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type MainResponse = {
  expeditions: ExpeditionsResponse;
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
  sort: 'cruiseLine' | 'name' | 'nearestDate' | 'startingPrice';
  dir: 'asc' | 'desc';
};
