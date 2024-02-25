import { IPagination, IPayloadRequestDataDto, PayloadRequestDto } from "@module/common";

export class CampaignListPayloadDto extends PayloadRequestDto<{
  pagination: IPagination;
}> {}
