import { IPagination } from "./Pagination.entity";

export interface IResponse<T> {
  data: T;
}

export interface ICreateResponse extends IResponse<{ id: string }> {}

export interface IListResponse<T> extends IResponse<T> {
  pagination: IPagination;
}
