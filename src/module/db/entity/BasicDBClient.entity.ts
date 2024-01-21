import { IData } from "./Data.entity";

export interface IBasicDBClient {
  create: (data: IData[], target: string) => Promise<void>;
  update: (data: IData[], target: string, id: string) => Promise<void>;
  delete: (id: string, target: string) => Promise<void>;
}
