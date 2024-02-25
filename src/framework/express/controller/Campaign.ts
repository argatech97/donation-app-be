import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CommonIdentifier, IAppErrorResponseHanlder } from "../common";
import { CampaignIdentifier } from "@module/campaign";
import { ICampaignUsecase } from "@module/campaign/usecase";

export interface ICampaignController {
  create: (req: Request, res: Response) => Promise<void>;
  get: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class CampaignController implements ICampaignController {
  @inject(new CommonIdentifier().appErrorResponseHandler)
  private errorHandler!: IAppErrorResponseHanlder;
  @inject(new CampaignIdentifier().usecase) private campaingUC!: ICampaignUsecase;

  create = async (req: Request, res: Response) => {
    await this.campaingUC.create(req.params);
  };
  get = async (req: Request, res: Response) => {};
}
