import { inject, injectable } from "inversify";
import { IRoleReqPayloadDto } from "../dto";
import { types } from "../Types";
import { IRoleRepository } from "../Role.repository";

export interface IRoleUC {
  create: (data: IRoleReqPayloadDto) => Promise<void>;
}

@injectable()
export class RoleUC implements IRoleUC {
  @inject(types().repo) roleRepo!: IRoleRepository;
  create = async (data: IRoleReqPayloadDto) => {
    return this.roleRepo.create(data);
  };
}
