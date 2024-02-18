import { inject, injectable } from "inversify";
import { CampaignIdentifier, ICreateCampaignPayload } from "../entity";
import { ICampaignUsecase } from "./Campaign.usecase";
import { StoryIdentifier } from "@module/story";
import { IStoryUsecase } from "@module/story/usecase";

export interface ICreateCampaignUsecase {
  execute: (data: ICreateCampaignPayload) => Promise<void>;
}

@injectable()
export class CreateCampaignUsecase implements ICreateCampaignUsecase {
  @inject(new CampaignIdentifier().usecase) private y!: ICampaignUsecase;
  @inject(new StoryIdentifier().usecase) private z!: IStoryUsecase;

  execute = async (data: ICreateCampaignPayload) => {
    const { campaign, story } = data;
    const storyRes = await this.z.create({
      story,
    });
    const campaignPayload = {
      ...campaign,
      storyId: storyRes.data.id,
    };
    await this.y.create(campaignPayload);
    return;
  };
}
