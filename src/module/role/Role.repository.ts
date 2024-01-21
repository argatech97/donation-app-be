import { IRoleReqPayloadDto } from "./dto";

export interface IRoleRepository {
  create: (data: IRoleReqPayloadDto) => Promise<void>;
}
