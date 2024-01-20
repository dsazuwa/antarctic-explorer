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
