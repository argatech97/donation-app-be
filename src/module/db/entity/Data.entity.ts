export type Value = string | boolean | number | string[] | number[];

export interface IData {
  columnName: string;
  value: Value;
}

export interface IDataArrValue {
  columnName: string;
  value: Value[];
}

export class Data implements IData {
  constructor(data: IData) {
    Object.assign(this, data);
  }
  columnName!: string;
  value!: string | number | boolean;
}
