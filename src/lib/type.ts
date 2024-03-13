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
  logo: string;
  name: string;
  duration: string;
  nearestDate: string | null;
  startingPrice: number | null;
  photoUrl: string;
};

export type TGallery = {
  alt: string;
  url: string;
};

export type TSchedule = {
  day: string;
  header: string;
  content: string[];
};

export type TItinerary = {
  id: number;
  name: string;
  startPort: string;
  endPort: string;
  duration: string;
  mapUrl: string;
  schedules: TSchedule[];
};

export type TVessel = {
  id: number;
  name: string;
  description: string[];
  capacity: number;
  cabins: number;
  photoUrl: string;
  website: string;
};

export type TDeparture = {
  id: number;
  expeditionId: number;
  name: string;
  itinerary: string;
  vessel: string;
  departingFrom: string | null;
  arrivingAt: string | null;
  duration: string;
  startDate: string;
  endDate: string;
  startingPrice: number;
  discountedPrice: number | null;
  website: string;
};

export type TExtension = {
  name: string;
  startingPrice: number | null;
  duration: number | null;
  photoUrl: string;
  website: string | null;
};

export type ExpeditionResponse = {
  id: number;
  name: string;
  description: string[];
  highlights: string[];
  duration: string;
  startingPrice: number;
  photoUrl: string;
  website: string;
  cruiseLine: { name: string; logo: string };
  gallery: TGallery[];
  vessels: TVessel[];
  itineraries: TItinerary[];
  departures: { startDate: Date; endDate: Date }[];
  extensions: TExtension[];
  otherExpeditions: TExpedition[];
};

export type ExpeditionsResponse = {
  data: TExpedition[];
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type DeparturesResponse = {
  data: TDeparture[];
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
  min: number | null;
  max: number | null;
}[];

export type SortType = {
  displayText: string;
  sort: string;
  dir: 'asc' | 'desc';
};

export type ExpeditionSortType = {
  displayText: string;
  sort: 'cruiseLine' | 'name' | 'nearestDate' | 'startingPrice';
  dir: 'asc' | 'desc';
};

export type DepartureSortType = {
  displayText: string;
  sort: 'startDate' | 'price';
  dir: 'asc' | 'desc';
};
