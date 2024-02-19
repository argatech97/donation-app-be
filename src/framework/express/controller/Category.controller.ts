import { CategoryPayloadRequestDto } from "@module/category/dto";
import { CategoryIdentifier } from "@module/category/entity";
import { ICategoryUsecase } from "@module/category/usecase";
import { IAppError } from "@module/common";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

export interface ICategoryController {
  create: (req: Request, res: Response) => Promise<void>;
  get: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class CategoryController implements ICategoryController {
  @inject(new CategoryIdentifier().usecase) private uc!: ICategoryUsecase;
  create = async (req: Request, res: Response) => {
    try {
      const payload = await new CategoryPayloadRequestDto(req.params).convertToEntity();
      await this.uc.create(payload);
      res.status(201);
    } catch (error) {
      res.status((error as IAppError).status).send(error);
    }
  };
  get = async (req: Request, res: Response) => {};
}
