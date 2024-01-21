export interface IPagination {
  page: number;
  limit: number;
  isDesc: boolean;
  sortBy: string;
  rowsNumber?: number;
}
