export type SearchParams =
  | { [key: string]: string | string[] | undefined }
  | undefined;

export type TCruiseLine = {
  id: number;
  name: string;
  logo: string;
};

type BaseExpedition = {
  id: number;
  name: string;
  duration: string;
  startDate: string | null;
  startingPrice: number | null;
  photoUrl: string;
};

export type TExpedition = BaseExpedition & {
  cruiseLine: TCruiseLine;
};

export type TGallery = {
  alt: string | null;
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

export type ExpeditionsParams = {
  page?: number;
  size?: number;
  sort?: string;
  dir?: string;
  cruiseLines?: string;
  startDate?: string;
  endDate?: string;
  'capacity.min'?: number | null;
  'capacity.max'?: number | null;
  'duration.min'?: number | null;
  'duration.max'?: number | null;
};

export type ExpeditionsResponse = {
  expeditions: TExpedition[];
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
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
  cruiseLine: TCruiseLine;
  gallery: TGallery[];
  vessels: TVessel[];
  itineraries: TItinerary[];
  departures: { startDate: Date; endDate: Date }[];
  extensions: TExtension[];
  otherExpeditions: BaseExpedition[];
};

export type DeparturesResponse = {
  departures: TDeparture[];
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

export type MainResponse = {
  expeditions: ExpeditionsResponse;
  cruiseLines: string[];
};

export type BasicFilterOption = { displayText: string };

export type RangedFilterOption =
  | {
      displayText: string;
      min: number;
      max: number;
    }
  | {
      displayText: string;
      min: number;
    };

export type SortType = {
  displayText: string;
  sort: string;
  dir: 'asc' | 'desc';
};

export type ExpeditionSortType = {
  displayText: string;
  sort: 'cruiseLine' | 'name' | 'startDate' | 'startingPrice';
  dir: 'asc' | 'desc';
};

export type DepartureSortType = {
  displayText: string;
  sort: 'startDate' | 'price';
  dir: 'asc' | 'desc';
};
