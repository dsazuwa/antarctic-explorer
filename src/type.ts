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
}[];

export type TExpedition = {
  id: number;
  website: string;
  name: string;
  description: string;
  departingFrom: string;
  arrivingAt: string;
  duration: string;
  startingPrice: number;
  photoUrl: string;
};

export type TCruiseLinesAndExpeditions = {
  cruiseLines: TCruiseLines;
  expeditions: TExpedition[];
};

export type ExpeditionSortType = {
  displayText: string;
  field: 'departure' | 'startingPrice' | 'name';
  dir: 'asc' | 'desc';
};
