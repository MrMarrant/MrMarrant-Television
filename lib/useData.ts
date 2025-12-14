import {MRMARRANT_DATAS as datas} from '../constants';

export function getData<T>(key: string): T {
  return datas[key];
}