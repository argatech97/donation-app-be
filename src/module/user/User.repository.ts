import { IUserReqPayloadDto } from "./dto";

export interface IUserRepository {
  createUser: (data: IUserReqPayloadDto) => Promise<void>;
}
