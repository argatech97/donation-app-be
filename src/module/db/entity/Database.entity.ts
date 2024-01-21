export interface Result<T> {
  rows: T[];
}

export interface IDatabase {
  query<T>(query: string): Promise<Result<T>>;
}
