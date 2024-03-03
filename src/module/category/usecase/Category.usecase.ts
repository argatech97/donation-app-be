import { IListResponse, IPagination } from "@module/common";
import { CategoryIdentifier, ICategory, IRequestPayload } from "../entity";
import { inject, injectable } from "inversify";
import { ICategoryRepository } from "../repository";

export interface ICategoryUsecase {
  create: (data: IRequestPayload) => Promise<void>;
  get: (pagination: IPagination) => Promise<IListResponse<ICategory[]>>;
}

@injectable()
export class CategoryUsecase implements ICategoryUsecase {
  @inject(new CategoryIdentifier().repo) private repo!: ICategoryRepository;
  create = async (data: IRequestPayload) => {
    await this.repo.create(data);
    return;
  };
  get = async (pagination: IPagination) => {
    const res = await this.repo.getList(pagination);
    return res;
  };
}
