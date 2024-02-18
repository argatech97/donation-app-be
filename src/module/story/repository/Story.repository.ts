import { ICreateResponse, IResponse } from "@module/common";
import { IStoryRequestPayload } from "../entity/RequestPayload.entity";
import { IStory } from "../entity";

export interface IStoryRepository {
  create: (data: IStoryRequestPayload) => Promise<ICreateResponse>;
  getDetail: (id: string) => Promise<IResponse<IStory>>;
}
