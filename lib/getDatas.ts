import { get } from "@vercel/edge-config";
import localData from "../local_data.json";

type Datas = keyof typeof localData;

export function getDatas<T = unknown>(key: Datas): T {
  return localData[key] as T;
}