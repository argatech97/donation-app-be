import {
  IFailResponse,
  InternalServerError,
  PayloadReqClient,
  SuccesCreateRes,
} from "@module/common";
import { inject, injectable } from "inversify";
import { types } from "./Types";
import { ICreateRolePayloadReq, IRoleUC } from "./usecase";

export interface IRoleController {
  createRole: (payload: PayloadReqClient) => Promise<SuccesCreateRes>;
}

@injectable()
export class RoleController implements IRoleController {
  @inject(types().UC) private x!: IRoleUC;
  @inject(types().createPayloadUC) y!: ICreateRolePayloadReq;

  createRole = async (payload: PayloadReqClient) => {
    try {
      const data = await this.y.execute(payload);
      await this.x.create(data);
      return new SuccesCreateRes();
    } catch (error) {
      if ((error as IFailResponse).status) {
        throw error;
      }

      throw new InternalServerError([(error as Error).message]);
    }
  };
}
