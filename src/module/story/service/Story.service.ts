import { inject, injectable } from "inversify";
import { IStory, IStoryRequestPayload } from "../entity";
import { IStoryRepository } from "../repository";
import { DatabaseIdentifier, IDatabaseClient } from "@module/db";

@injectable()
export class StoryService implements IStoryRepository {
  private tableName = "story";
  @inject(new DatabaseIdentifier().databaseClient) private dbClient!: IDatabaseClient;
  getDetail = async (id: string) => {
    const response = this.dbClient.getById<IStory>({
      tableName: this.tableName,
      id,
      column: ["story", "id"],
    });

    return response;
  };
  create = async (data: IStoryRequestPayload) => {
    return this.dbClient.create({
      tableName: this.tableName,
      data,
    });
  };
}
