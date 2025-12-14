import {MRMARRANT_DATAS as datas} from '../constants';

type DatasKey = keyof typeof datas;

export function getConfigValue<T = unknown>(key: DatasKey): T {
  return datas[key] as T;
}

export function getData<T = unknown>(key: string): T {
  return datas[key] as T;
}