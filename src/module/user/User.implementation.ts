import { IBasicDBClient, IData, Data, types } from "@module/db";
import { IUserRepository } from "./User.repository";
import { IUserReqPayloadDto } from "./dto";
import { inject, injectable } from "inversify";
@injectable()
export class UserRepoImpl implements IUserRepository {
  @inject(types().basicDBClient) private dbClient!: IBasicDBClient;

  private target = "user";

  createUser = async (data: IUserReqPayloadDto) => {
    const dataDb: IData[] = Object.keys(data).map(
      (el) => new Data({ columnName: el, value: data[el as keyof IUserReqPayloadDto] }),
    );
    await this.dbClient.create(dataDb, this.target);
    return;
  };
}
