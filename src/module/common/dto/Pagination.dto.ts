export interface IPagination {
  limit: number;
  page: number;
  orderBy?: string;
  isDesc?: boolean;
}
