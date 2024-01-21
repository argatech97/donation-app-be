import {
  IFailResponse,
  InternalServerError,
  ISuccessResponse,
  PayloadReqClient,
  SuccesCreateRes,
} from "@module/common";
import { IUserUsecase } from "./usecase";
import { ICreateUserReqPayload } from "./usecase/CreateUserReqPayload.usecase";
import { inject, injectable } from "inversify";
import { types } from "./Types";

export interface IUserController {
  createUser: (req: PayloadReqClient) => Promise<ISuccessResponse<void>>;
}

@injectable()
export class UserController implements IUserController {
  @inject(types().userUC) private userUC!: IUserUsecase;
  @inject(types().createPayloadUserUC) private createPayloadReq!: ICreateUserReqPayload;

  async createUser(data: PayloadReqClient) {
    try {
      const x = await this.createPayloadReq.execute(data);
      await this.userUC.createUser(x);
      return new SuccesCreateRes();
    } catch (error) {
      if ((error as IFailResponse).status) {
        throw error;
      }

      throw new InternalServerError([`${(error as Error).message}`]);
    }
  }
}
