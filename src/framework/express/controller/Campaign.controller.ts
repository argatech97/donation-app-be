import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { commonIdentifier, IAppErrorResponseHanlder } from "../common";
import { campaignIdentifier } from "@module/campaign";
import { ICampaignUsecase } from "@module/campaign/usecase";
import { CampaignListPayloadDto, CampaignPayloadDto } from "@module/campaign/dto";

export interface ICampaignController {
  create: (req: Request, res: Response) => Promise<void>;
  get: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class CampaignController implements ICampaignController {
  @inject(commonIdentifier.appErrorResponseHandler)
  private errorHandler!: IAppErrorResponseHanlder;
  @inject(campaignIdentifier.usecase) private campaignUC!: ICampaignUsecase;

  create = async (req: Request, res: Response) => {
    try {
      const payload = await new CampaignPayloadDto(req.params).convertToEntity();
      const response = await this.campaignUC.create(payload);
      res.status(201).send(response);
    } catch (error) {
      this.errorHandler.execute(res, error);
    }
  };
  get = async (req: Request, res: Response) => {
    try {
      const { pagination, filter } = await new CampaignListPayloadDto(req.query).convertToEntity();
      const response = await this.campaignUC.get(pagination, filter);
      res.status(200).send(response);
    } catch (error) {
      this.errorHandler.execute(res, error);
    }
  };
}
