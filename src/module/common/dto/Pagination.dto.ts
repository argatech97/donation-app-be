export interface IPagination {
  offset: string | "0";
  limit: number;
  orderBy?: string;
  isDesc?: boolean;
  isNext?: boolean;
}
