import { inject, injectable } from "inversify";

import { ICreateResponse, IListResponse, IPagination } from "@module/common";
import { ICampaign, ICampaignFilter, ICampaignRequestPayload, campaignIdentifier } from "../entity";
import { ICampaignRepository } from "../repository";

export interface ICampaignUsecase {
  create: (data: ICampaignRequestPayload) => Promise<ICreateResponse>;
  get: (pagination: IPagination, filter?: ICampaignFilter) => Promise<IListResponse<ICampaign[]>>;
}

@injectable()
export class CampaignUsecase implements ICampaignUsecase {
  @inject(campaignIdentifier.repo) private repo!: ICampaignRepository;

  create = async (data: ICampaignRequestPayload) => {
    return this.repo.create(data);
  };
  get = async (pagination: IPagination, filter?: ICampaignFilter) => {
    return this.repo.get(pagination, filter);
  };
}
