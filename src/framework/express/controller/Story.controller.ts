import { storyIdentifier } from "@module/story";
import { IStoryUsecase } from "@module/story/usecase";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAppErrorResponseHanlder, commonIdentifier } from "../common";
import { StoryDetailPayloadDto, StoryPayloadDto } from "@module/story/dto";

export interface IStoryController {
  create: (req: Request, res: Response) => Promise<void>;
  getDetail: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class StoryController implements IStoryController {
  @inject(storyIdentifier.usecase) private uc!: IStoryUsecase;
  @inject(commonIdentifier.appErrorResponseHandler) private errorHandler!: IAppErrorResponseHanlder;

  create = async (req: Request, res: Response) => {
    try {
      const payload = await new StoryPayloadDto(req.params).convertToEntity();
      const response = await this.uc.create(payload);
      res.status(201).send(response);
    } catch (error) {
      this.errorHandler.execute(res, error);
    }
  };
  getDetail = async (req: Request, res: Response) => {
    try {
      const payload = await new StoryDetailPayloadDto({ id: req.params.id }).convertToEntity();
      const response = await this.uc.getDetail(payload.id);
      res.status(200).send(response);
    } catch (error) {
      this.errorHandler.execute(res, error);
    }
  };
}
