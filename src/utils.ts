export const toggleIndex = (index: number, selectedIndices: number[]) =>
  selectedIndices.includes(index)
    ? selectedIndices.filter((i) => i !== index)
    : [...selectedIndices, index];
