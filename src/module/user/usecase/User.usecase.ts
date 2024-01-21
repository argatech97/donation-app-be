import { inject, injectable } from "inversify";
import { IUserReqPayloadDto } from "../dto";
import { IUserRepository } from "../User.repository";
import { types } from "../Types";

export interface IUserUsecase {
  createUser: (data: IUserReqPayloadDto) => Promise<void>;
}

@injectable()
export class UserUsecase implements IUserUsecase {
  @inject(types().userRepo) private repo!: IUserRepository;
  createUser = async (data: IUserReqPayloadDto) => {
    return this.repo.createUser(data);
  };
}
