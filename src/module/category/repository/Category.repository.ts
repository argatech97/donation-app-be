import { IListResponse, IPagination } from "@module/common";
import { ICategory, IRequestPayload } from "../entity";

export interface ICategoryRepository {
  create: (data: IRequestPayload) => Promise<void>;
  getList: (pagination: IPagination) => Promise<IListResponse<ICategory>>;
}
