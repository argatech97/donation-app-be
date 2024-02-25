import { IPayloadRequestDataDto, PayloadRequestDto } from "@module/common";
import { IRequestPayload } from "../entity";

export class CategoryPayloadDto extends PayloadRequestDto<IRequestPayload> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }
  convertToEntity = async () => {
    this.checkProperty(["name"]);
    const { name } = this.data;
    return {
      name,
    };
  };
}
