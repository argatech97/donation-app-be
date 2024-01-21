import { IData } from "@module/db";

export interface ICampaign extends IData {
  title: string;
  thumbnail: string;
  amount: number;
  targetAmount: number;
  createdBy: string;
  categoryId: string;
}
