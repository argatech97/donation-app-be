import { IAppError, IPayloadRequestDataDto, PayloadRequestDto } from "@module/common";
import { IRequestPayload } from "../entity";

export class CategoryCreatePayload extends PayloadRequestDto<IRequestPayload> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }
  convertToEntity = async () => {
    try {
      this.checkProperty(["name"]);
      const { name } = this.data;
      return {
        name,
      };
    } catch (error) {
      throw error as IAppError;
    }
  };
}
