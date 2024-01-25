import {
  BasicFilterOption,
  ExpeditionSortType,
  FilterState,
  RangedFilterOption,
  TExpedition,
} from './type';

export const toggleIndex = (index: number, selectedIndices: number[]) =>
  selectedIndices.includes(index)
    ? selectedIndices.filter((i) => i !== index)
    : [...selectedIndices, index];

export const sortByString = (
  valA: string | null,
  valB: string | null,
  dir: 'asc' | 'desc',
) => {
  if (valA === null) return 1;
  if (valB === null) return -1;

  return dir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
};

export const sortByNumber = (
  valA: number | null,
  valB: number | null,
  dir: 'asc' | 'desc',
) => {
  if (valA === null) return 1;
  if (valB === null) return -1;

  return dir === 'asc' ? valA - valB : valB - valA;
};

export const matchesDuration = (duration: string, min: number, max: number) => {
  const durations = duration.split(' - ').map((x) => Number.parseInt(x));

  if (durations.length === 1) return durations[0] >= min && durations[0] <= max;

  return (
    (durations[0] >= min && durations[0] <= max) ||
    (durations[1] >= min && durations[1] <= max)
  );
};

export const filterExpeditions = (
  expeditions: TExpedition[],
  filters: FilterState,
  cruiseLineOptions: BasicFilterOption,
  durationOptions: RangedFilterOption,
) => {
  return expeditions.filter((expedition) => {
    const matchesCruiseLine =
      filters.cruiseLines.length === 0 ||
      filters.cruiseLines.some(
        (i) => cruiseLineOptions[i].displayName === expedition.cruiseLine,
      );

    return (
      matchesCruiseLine &&
      matchesDuration(
        expedition.duration,
        durationOptions[filters.duration].min,
        durationOptions[filters.duration].max,
      )
    );
  });
};

export const sortExpeditions = (
  expeditions: TExpedition[],
  sortBy: ExpeditionSortType,
) => {
  return expeditions.sort((a, b) => {
    switch (sortBy.field) {
      case 'cruiseLine':
        const comparison = sortByString(
          a[sortBy.field],
          b[sortBy.field],
          sortBy.dir,
        );
        return comparison !== 0
          ? comparison
          : sortByString(a.name, b.name, sortBy.dir);

      case 'name':
        return sortByString(a[sortBy.field], b[sortBy.field], sortBy.dir);

      case 'startingPrice':
        return sortByNumber(a[sortBy.field], b[sortBy.field], sortBy.dir);

      default:
        return 0;
    }
  });
};

export const paginateExpeditions = (
  filteredExpeditions: TExpedition[],
  currentPage: number,
  selectedItemsPerPageOption: number,
  itemsPerPageOptions: number[],
) => {
  return filteredExpeditions.filter(
    (_, i) =>
      i < currentPage * itemsPerPageOptions[selectedItemsPerPageOption] &&
      i + 1 >
        (currentPage - 1) * itemsPerPageOptions[selectedItemsPerPageOption],
  );
};
