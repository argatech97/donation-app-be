export type IFilterOperator = "<" | "<=" | "==" | ">" | ">=" | "!=";

export interface IFilter {
  property: string;
  operator: IFilterOperator;
  value: unknown;
}

export class EqualToFilter implements IFilter {
  constructor(name: string, value: unknown) {
    this.property = name;
    this.operator = "==";
    this.value = value;
  }
  property!: string;
  operator!: IFilterOperator;
  value: unknown;
}
