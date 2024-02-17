import { IRequestPayload } from "@module/campaign";
import { IListResponse, IPagination } from "@module/common";
import { ICategory } from "../entity";

export interface ICategoryRepository {
  create: (data: IRequestPayload) => Promise<void>;
  getList: (pagination: IPagination) => Promise<IListResponse<ICategory>>;
}
