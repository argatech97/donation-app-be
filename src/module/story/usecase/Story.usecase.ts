import { inject, injectable } from "inversify";
import { IStoryRequestPayload, StoryIdentifier } from "../entity";
import { IStoryRepository } from "../repository";
import { ICreateResponse } from "@module/common";

export interface IStoryUsecase {
  create: (data: IStoryRequestPayload) => Promise<ICreateResponse>;
}

@injectable()
export class StoryUsecase implements IStoryUsecase {
  @inject(new StoryIdentifier().repo) private repo!: IStoryRepository;
  create = async (data: IStoryRequestPayload) => {
    return this.repo.create(data);
  };
}
