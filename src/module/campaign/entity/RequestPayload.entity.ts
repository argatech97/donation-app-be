import { ICampaign } from "./Campaign.entity";

export interface IRequestPayload extends Omit<ICampaign, "id"> {}
