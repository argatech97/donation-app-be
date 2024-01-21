export interface IData {
  columnName: string;
  value: string | boolean | number | string[] | number[];
}

export class Data implements IData {
  constructor(data: IData) {
    Object.assign(this, data);
  }
  columnName!: string;
  value!: string | number | boolean;
}
