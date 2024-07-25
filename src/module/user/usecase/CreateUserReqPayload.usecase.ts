import { IUserReqPayloadDto } from "../dto";
import { BadReq, PayloadReqClient, types } from "@module/common";
import { inject, injectable } from "inversify";
import { ICreatePayloadUC } from "@module/common/usecase";
import { IPasswordValidator, types as typesValidator } from "@module/validator";
export interface ICreateUserReqPayload {
  execute: (data: PayloadReqClient) => Promise<IUserReqPayloadDto>;
}

@injectable()
export class CreateUserReqPayload implements ICreateUserReqPayload {
  @inject(types().createPayloadUC) private createPayload!: ICreatePayloadUC<IUserReqPayloadDto>;
  @inject(typesValidator().passwordValidator) private passwordValidator!: IPasswordValidator;

  execute = async (data: PayloadReqClient) => {
    const x = await this.createPayload.execute(data, {
      name: ["required", "string"],
      email: ["required", "string", "email"],
      roleId: ["required", "string"],
      password: ["required"],
    });
    const isPasswordValid = await this.passwordValidator.execute(x.password);
    if (!isPasswordValid.isValid)
      throw new BadReq([`invalid value of password: ${isPasswordValid.message}`]);
    return x;
  };
}
