import { IPayloadRequestDataDto, PayloadRequestDto } from "@module/common";
import { ICampaignRequestPayload } from "../entity";

export class CampaignPayloadDto extends PayloadRequestDto<ICampaignRequestPayload> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }

  convertToEntity = async () => {
    this.checkProperty([
      "title",
      "thumbnail",
      "amount",
      "targetAmount",
      "createdBy",
      "categoryId",
      "storyId",
    ]);

    return this.data as ICampaignRequestPayload;
  };
}
