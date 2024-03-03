export interface IPagination {
  page: number;
  limit: number;
  isNext?: boolean;
  isDesc?: boolean;
  orderBy?: string;
  rowsNumber?: number;
}

export class Pagination implements IPagination {
  constructor(data: IPagination) {
    Object.assign(this, data);
  }
  page!: number;
  limit!: number;
  isDesc?: boolean | undefined;
  orderBy?: string | undefined;
  rowsNumber?: number | undefined;
}
