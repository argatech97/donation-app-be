import { inject, injectable } from "inversify";
import { IUserReqPayloadDto } from "../dto";
import { IUserRepository } from "../User.repository";
import { types } from "../Types";
import { IHashModule, types as secTypes } from "@module/security";
export interface IUserUsecase {
  createUser: (data: IUserReqPayloadDto) => Promise<void>;
}

@injectable()
export class UserUsecase implements IUserUsecase {
  @inject(types().userRepo) private repo!: IUserRepository;
  @inject(secTypes().hashModule) private hashModule!: IHashModule;
  createUser = async (data: IUserReqPayloadDto) => {
    const hashedPassword = await this.hashModule.hash(data.password);
    return this.repo.createUser({ ...data, password: hashedPassword });
  };
}
