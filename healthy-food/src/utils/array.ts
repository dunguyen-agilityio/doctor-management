export const range = (length: number, start = 0) => {
  return Array(length)
    .fill(0)
    .map((_, idx) => start + idx);
};
