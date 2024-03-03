import { IFilter, ICreateResponse, IPagination, IResponse, IListResponse } from "@module/common";

export interface IData {
  [key: string]: string | number | boolean;
}

export interface ICreateOptions<T> {
  data: T;
  tableName: string;
}

export interface IGetOptions {
  column: string[];
  tableName: string;
  pagination: IPagination;
  filter?: IFilter[];
  offsetByRecordId?: string;
}

export interface IGetByIdOptions {
  column: string[];
  tableName: string;
  id: string;
}

export interface IDatabaseClient {
  create: <T extends IData>(options: ICreateOptions<T>) => Promise<ICreateResponse>;
  get: <T>(options: IGetOptions) => Promise<IListResponse<T[]>>;
  getById: <T>(options: IGetByIdOptions) => Promise<IResponse<T>>;
}
