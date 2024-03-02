export type IFilterOperator = "<" | "<=" | "==" | ">" | ">=" | "!=";

export interface IFilter {
  property: string;
  operator: IFilterOperator;
  value: unknown;
}
