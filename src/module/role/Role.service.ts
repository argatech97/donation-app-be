import { inject, injectable } from "inversify";
import { IRoleRepository } from "./Role.repository";
import { Data, IBasicDBClient, types } from "@module/db";
import { IRoleReqPayloadDto } from "./dto";

@injectable()
export class RoleService implements IRoleRepository {
  @inject(types().basicDBClient) private dbClient!: IBasicDBClient;
  table = "role";
  create = async (data: IRoleReqPayloadDto) => {
    const x = Object.keys(data).map(
      (el) => new Data({ columnName: el, value: data[el as keyof IRoleReqPayloadDto] }),
    );
    return this.dbClient.create(x, this.table);
  };
}
