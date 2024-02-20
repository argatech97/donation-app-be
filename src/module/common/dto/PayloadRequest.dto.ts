import { BadRequest } from "../entity";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPayloadRequestDataDto {
  [key: string]: any;
}

export abstract class PayloadRequestDto<T> {
  constructor(data: IPayloadRequestDataDto) {
    this.data = data;
  }

  data!: IPayloadRequestDataDto;
  checkProperty = (propertys: string[]) => {
    propertys.forEach((el) => {
      if (this.data[el] === undefined) {
        throw new BadRequest();
      }
    });
  };
  abstract convertToEntity: () => Promise<T>;
}
