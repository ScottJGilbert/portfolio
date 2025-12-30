import { Comment, User } from "./definitions";
import { updateUser } from "./db";

export function capitalizeFirstLetter(input: string): string {
  const firstCharacter = input.charAt(0);
  return firstCharacter.toUpperCase() + input.slice(1);
}

/**
 * Filter an array and remove the filtered contents of the old array
 * @param  {T[]} arr The array to be filtered
 * @param  {(value: T, index: number, array: T[]) => boolean} callback The function to filter the array with
 * @return {newArray} All of the items that have been filtered from the array
 */

export function filterInPlace<T>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => boolean
): T[] {
  let i = 0;

  const newArray: T[] = [];

  while (i < arr.length) {
    if (callback(arr[i], i, arr)) {
      newArray.push(arr.splice(i, 1)[0]); // remove element at i
    } else {
      i++;
    }
  }
  return newArray;
}

export function checkCommentLength(comment: Comment): boolean {
  if (comment.content.length === 0) return false;

  if (comment.parent_comment_id) return comment.content.length <= 800;

  return comment.content.length <= 1600;
}

export async function checkRateLimit(user: User): Promise<boolean> {
  try {
    const currentTime = new Date();

    if (
      currentTime.getTime() - user.firstCommentTime.getTime() >
      5 * 60 * 1000
    ) {
      await updateUser({ ...user, comments: 1, firstCommentTime: currentTime });
      return true;
    }

    if (user.comments <= 15) {
      await updateUser({ ...user, comments: user.comments + 1 });
      return true;
    }

    return false;
  } catch (err) {
    console.log("Rate limit check error:", err);
    return false;
  }
}
