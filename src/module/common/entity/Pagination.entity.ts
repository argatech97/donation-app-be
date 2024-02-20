export interface IPagination {
  page: number;
  limit: number;
  isDesc?: boolean;
  sortBy?: string;
  rowsNumber?: number;
}

export class Pagination implements IPagination {
  constructor(data: IPagination) {
    Object.assign(this, data);
  }
  page!: number;
  limit!: number;
  isDesc?: boolean | undefined;
  sortBy?: string | undefined;
  rowsNumber?: number | undefined;
}
