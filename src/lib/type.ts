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
  description: string[];
  departingFrom: string;
  arrivingAt: string;
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
  name: string;
  startPort: string;
  endPort: string;
  duration: string;
  mapUrl: string;
  schedules: TSchedule[];
};

export type TVessel = {
  name: string;
  description: string[];
  capacity: number;
  cabins: number;
  photoUrl: string;
  website: string;
};

export type TDeparture = {
  // itineraryId: number;
  // vesselId: number;
  // name: string;
  // startDate: string;
  // endDate: string;
  // startingPrice: number;
  id: number;
  expeditionId: number;
  name: string;
  vessel: string;
  startDate: string;
  endDate: string;
  startingPrice?: number;
  website: string;
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
  vessels: { [id: number]: TVessel };
  itinerary: { [id: number]: TItinerary };
  departures: TDeparture[];
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
  min: number;
  max: number;
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
  sort: 'startDate' | 'startingPrice';
  dir: 'asc' | 'desc';
};
