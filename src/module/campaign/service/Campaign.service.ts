import { IPagination } from "@module/common/entity";
import { ICampaign, ICampaignFilter, IRequestPayload } from "../entity";
import { ICampaignRepository } from "../repository";
import { injectable, inject } from "inversify";
import { DatabaseIdentifier, IDatabaseClient } from "@module/db";

@injectable()
export class ICampaignService implements ICampaignRepository {
  @inject(new DatabaseIdentifier().databaseClient) private dbClient!: IDatabaseClient;
  private tableName = "campaign";
  private columns: string[] = [
    "title",
    "thumbnail",
    "amount",
    "targetAmount",
    "createdBy",
    "categoryId",
  ];

  create = async (data: IRequestPayload) => {
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
      filter,
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
