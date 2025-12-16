import {MRMARRANT_DATAS as datas} from '../constants';

/*
* Functions related to fetching datas
* Datas are located in pastebin
*/

  /**
 * Returns the data stored according to the defined key
 *
 * @param key @string - The key
 * @returns @T
 */
export function getData<T>(key: string): T {
  return datas[key];
}