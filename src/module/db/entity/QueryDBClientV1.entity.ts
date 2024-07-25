import { IPagination } from "@module/common";
import { IData, IDataArrValue, Value } from "./Data.entity";

interface IConditionV1 {
  type: "condition-v1";
  data: IData;
  operator: "<" | ">" | "<=" | ">=" | "!=" | "==";
}

export class ConditionV1 implements IConditionV1 {
  constructor(data: IConditionV1) {
    Object.assign(this, data);
  }
  type!: "condition-v1";
  data!: IData;
  operator!: "<" | ">" | "<=" | ">=" | "!=" | "==";
}

interface IConditionV2 {
  type: "condition-v2";
  operator: "OR";
  data: IDataArrValue;
}

export class ConditionV2 implements IConditionV2 {
  constructor(data: IConditionV2) {
    Object.assign(this, data);
  }
  type!: "condition-v2";
  operator!: "OR";
  data!: IDataArrValue;
}

type Condition = IConditionV1 | IConditionV2;

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
