import { CategoryCreatePayload, CategoryListPayload } from "@module/category/dto";
import { CategoryIdentifier } from "@module/category/entity";
import { ICategoryUsecase } from "@module/category/usecase";
import { IAppError } from "@module/common";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CommonIdentifier, IAppErrorResponseHanlder } from "../common";

export interface ICategoryController {
  create: (req: Request, res: Response) => Promise<void>;
  get: (req: Request, res: Response) => Promise<void>;
}

@injectable()
export class CategoryController implements ICategoryController {
  @inject(new CommonIdentifier().appErrorResponseHandler)
  private errorHandler!: IAppErrorResponseHanlder;
  @inject(new CategoryIdentifier().usecase) private uc!: ICategoryUsecase;
  create = async (req: Request, res: Response) => {
    try {
      const payload = await new CategoryCreatePayload(req.params).convertToEntity();
      await this.uc.create(payload);
      res.status(201);
    } catch (error) {
      this.errorHandler.execute(res, error as IAppError);
    }
  };
  get = async (req: Request, res: Response) => {
    try {
      const payload = await new CategoryListPayload(req.query).convertToEntity();
      await this.uc.get(payload);
    } catch (error) {
      this.errorHandler.execute(res, error as IAppError);
    }
  };
}
