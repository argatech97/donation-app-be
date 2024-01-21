import { ICreatePayloadUC, PayloadReqClient } from "@module/common";
import { inject, injectable } from "inversify";
import { types } from "@module/common";
import { IRoleReqPayloadDto } from "../dto";

export interface ICreateRolePayloadReq {
  execute: (data: PayloadReqClient) => Promise<IRoleReqPayloadDto>;
}

@injectable()
export class CreateRolePayloadReq implements ICreateRolePayloadReq {
  @inject(types().createPayloadUC) private x!: ICreatePayloadUC<IRoleReqPayloadDto>;
  execute = async (data: PayloadReqClient) => {
    return this.x.execute(data, { roleName: ["required", "string"] });
  };
}
