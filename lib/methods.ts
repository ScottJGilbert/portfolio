export function capitalizeFirstLetter(input: string): string {
  const firstCharacter = input.charAt(0);
  return firstCharacter.toUpperCase() + input.slice(1);
}

/**
 * Filter an array and remove the filtered contents of the old array
 * @param  {any[]} arr The array to be filtered
 * @param  {(...args: any[]) => boolean} callback The function to filter the array with
 * @return {newArray} All of the items that have been filtered from the array
 */

export function filterInPlace<T>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => boolean
): T[] {
  let i = 0;

  const newArray: T[] = [];

  while (i < arr.length) {
    if (!callback(arr[i], i, arr)) {
      newArray.concat(arr.splice(i, 1)); // remove element at i
    } else {
      i++;
    }
  }
  return newArray;
}
