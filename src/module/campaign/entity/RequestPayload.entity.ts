import { IData } from "@module/db";
import { ICampaign } from "./Campaign.entity";

export interface ICampaignRequestPayload extends Omit<ICampaign, "id">, IData {}
