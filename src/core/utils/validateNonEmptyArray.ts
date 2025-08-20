/**
 * Checks whether the input is a non-empty array.
 *
 * @param array - The value to be checked.
 * @returns The array if it is a valid non-empty array, otherwise `null`.
 *
 * @example
 * validateNonEmptyArray([1, 2, 3]); // returns [1, 2, 3]
 * validateNonEmptyArray([]); // returns null
 * validateNonEmptyArray(null); // returns null
 */
export const validateNonEmptyArray = (array: any[]): any[] | null => {
  if (!array || !Array.isArray(array) || array.length === 0) return null;
  return array;
};
