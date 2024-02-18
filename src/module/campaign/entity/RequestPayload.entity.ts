import { IData } from "@module/db";
import { ICampaign } from "./Campaign.entity";

export interface ICampaignRequestPayload extends Omit<ICampaign, "id">, IData {}

export interface ICreateCampaignPayload {
  campaign: Omit<ICampaign, "id" | "storyId">;
  thumbnail: File;
  story: string;
}
