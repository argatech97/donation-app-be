import { ICreateResponse, IListResponse, IPagination } from "@module/common/entity";
import { ICampaign, ICampaignFilter, IRequestPayload } from "../entity";

export interface ICampaignRepository {
  create: (data: IRequestPayload) => Promise<ICreateResponse>;
  getDetail: (id: string) => Promise<ICampaign>;
  get: (pagination: IPagination, filter?: ICampaignFilter) => Promise<IListResponse<ICampaign>>;
}
