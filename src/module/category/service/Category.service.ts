import { IRequestPayload } from "@module/campaign";
import { IPagination } from "@module/common";
import { ICategoryRepository } from "../repository";
import { inject, injectable } from "inversify";
import { DatabaseIdentifier, IDatabaseClient } from "@module/db";
import { ICategory } from "../entity";

@injectable()
export class CategoryService implements ICategoryRepository {
  @inject(new DatabaseIdentifier().databaseClient) private dbClient!: IDatabaseClient;
  private tableName = "category";
  private columns = ["id", "name"];
  create = async (data: IRequestPayload) => {
    await this.dbClient.create({
      data,
      tableName: this.tableName,
    });
    return;
  };

  getList = async (pagination: IPagination) => {
    const response = await this.dbClient.get<ICategory>({
      pagination,
      tableName: this.tableName,
      column: this.columns,
    });

    return response;
  };
}
