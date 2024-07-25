import { IPagination } from "@module/common";
import { IData, IDataArrValue, Value } from "./Data.entity";

interface IComparison {
  data: IData;
  operator: "<" | ">" | "<=" | ">=" | "!=" | "==";
}

export class Comparison implements IComparison {
  constructor(data: IComparison) {
    Object.assign(this, data);
  }
  data!: IData;
  operator!: "<" | ">" | "<=" | ">=" | "!=" | "==";
}

interface IWhether {
  operator: "OR";
  data: IDataArrValue;
}

export class Whether implements IWhether {
  constructor(data: IWhether) {
    Object.assign(this, data);
  }
  operator!: "OR";
  data!: IDataArrValue;
}

type Condition = Comparison | Whether;

export interface IOptions {
  pagination?: IPagination;
  target: string;
  column?: string[];
  condition?: Condition[];
}

interface IListData {
  totalData: number;
  data: { [key: string]: Value }[];
}

export interface IQueryDBClientV1 {
  getList: (options: IOptions) => Promise<IListData>;
  getById: (options: IOptions, id: string) => Promise<{ [key: string]: Value[] }>;
}
