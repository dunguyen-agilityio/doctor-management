export const isInEnum = <T extends Record<string, string | number>>(
  obj: T,
  key: unknown = null,
): key is keyof T => {
  if (key == null) return false;
  return Object.keys(obj).includes(String(key));
};

export const isArrayEqual = <T>(arr1: T[], arr2: T[]) =>
  arr1.length == arr2.length && arr1.every((item) => arr2.includes(item));
