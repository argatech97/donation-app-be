import { IPagination } from "@module/common/entity";
import { ICampaign, ICampaignFilter, ICampaignRequestPayload } from "../entity";
import { ICampaignRepository } from "../repository";
import { injectable, inject } from "inversify";
import { EqualToFilter, IDatabaseClient, databaseIdentifier } from "@module/db";

@injectable()
export class CampaignService implements ICampaignRepository {
  @inject(databaseIdentifier.databaseClient) private dbClient!: IDatabaseClient;
  private tableName = "campaign";
  private columns: string[] = [
    "title",
    "thumbnail",
    "amount",
    "targetAmount",
    "createdBy",
    "categoryId",
  ];

  create = async (data: ICampaignRequestPayload) => {
    const res = await this.dbClient.create({
      data,
      tableName: this.tableName,
    });
    return res;
  };

  get = async (pagination: IPagination, filter?: ICampaignFilter) => {
    const res = await this.dbClient.get<ICampaign>({
      column: this.columns,
      tableName: this.tableName,
      pagination,
      filter: filter
        ? Object.keys(filter).map((el) => new EqualToFilter(el, filter[el]))
        : undefined,
    });

    return res;
  };

  getDetail = async (id: string) => {
    const res = await this.dbClient.getById<ICampaign>({
      column: this.columns,
      tableName: this.tableName,
      id,
    });

    return res.data;
  };
}
