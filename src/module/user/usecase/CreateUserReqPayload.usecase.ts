import { IUserReqPayloadDto } from "../dto";
import { PayloadReqClient, types } from "@module/common";
import { inject, injectable } from "inversify";
import { ICreatePayloadUC } from "@module/common/usecase";
export interface ICreateUserReqPayload {
  execute: (data: PayloadReqClient) => Promise<IUserReqPayloadDto>;
}

@injectable()
export class CreateUserReqPayload implements ICreateUserReqPayload {
  @inject(types().createPayloadUC) private createPayload!: ICreatePayloadUC<IUserReqPayloadDto>;
  execute = async (data: PayloadReqClient) => {
    return this.createPayload.execute(data, {
      name: ["required", "string"],
      email: ["required", "string", "email"],
      roleId: ["required", "string"],
    });
  };
}
