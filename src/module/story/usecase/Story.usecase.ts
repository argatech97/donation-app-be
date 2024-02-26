import { inject, injectable } from "inversify";
import { IStory, IStoryRequestPayload, StoryIdentifier } from "../entity";
import { IStoryRepository } from "../repository";
import { ICreateResponse, IResponse } from "@module/common";

export interface IStoryUsecase {
  create: (data: IStoryRequestPayload) => Promise<ICreateResponse>;
  getDetail: (id: string) => Promise<IResponse<IStory>>;
}

@injectable()
export class StoryUsecase implements IStoryUsecase {
  @inject(new StoryIdentifier().repo) private repo!: IStoryRepository;
  create = async (data: IStoryRequestPayload) => {
    return this.repo.create(data);
  };
  getDetail = async (id: string) => {
    return this.repo.getDetail(id);
  };
}
