import { ICreateResponse, IListResponse, IPagination } from "@module/common/entity";
import { ICampaign, ICampaignFilter, ICampaignRequestPayload } from "../entity";

export interface ICampaignRepository {
  create: (data: ICampaignRequestPayload) => Promise<ICreateResponse>;
  getDetail: (id: string) => Promise<ICampaign>;
  get: (pagination: IPagination, filter?: ICampaignFilter) => Promise<IListResponse<ICampaign>>;
}
