import { IPagination, IPayloadRequestDataDto, PayloadRequestDto } from "@module/common";
import { ICampaignFilter } from "../entity";

export class CampaignListPayloadDto extends PayloadRequestDto<{
  pagination: IPagination;
  filter: ICampaignFilter;
}> {
  constructor(data: IPayloadRequestDataDto) {
    super(data);
  }

  convertToEntity = async () => {
    this.checkProperty(["page", "limit"]);
    const { page, limit, isDesc, sortBy, category } = this.data;
    return {
      pagination: {
        page,
        limit,
        isDesc,
        sortBy,
      },
      filter: {
        category,
      },
    };
  };
}
