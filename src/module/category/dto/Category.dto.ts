import { BadRequest } from "@module/common";
import { IRequestPayload } from "../entity";

export interface IPayloadRequestDataDto {
  [key: string]: string;
}

export abstract class PayloadRequestDto<T> {
  constructor(data: IPayloadRequestDataDto) {
    this.data = data;
  }

  data!: IPayloadRequestDataDto;
  abstract convertToEntity: () => Promise<T>;
}

export class CategoryPayloadRequestDto extends PayloadRequestDto<IRequestPayload> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }
  convertToEntity = async () => {
    try {
      const { name } = this.data;
      return {
        name,
      };
    } catch (error) {
      throw new BadRequest();
    }
  };
}
