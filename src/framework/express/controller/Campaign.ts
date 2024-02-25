import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CommonIdentifier, IAppErrorResponseHanlder } from "../common";
import { CampaignIdentifier } from "@module/campaign";
import { ICampaignUsecase } from "@module/campaign/usecase";
import { CampaignPayloadDto } from "@module/campaign/dto";

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
    try {
      const payload = await new CampaignPayloadDto(req.params).convertToEntity();
      const response = await this.campaingUC.create(payload);
      res.status(201).send(response);
    } catch (error) {
      this.errorHandler.execute(res, error);
    }
  };
  get = async (req: Request, res: Response) => {

  };
}
