import { IAppError } from "@module/common";
import { Response } from "express";
import { injectable } from "inversify";

export interface IAppErrorResponseHanlder {
  execute: (res: Response, error: IAppError) => void;
}

@injectable()
export class AppErrorResponseHanlder implements IAppErrorResponseHanlder {
  execute = (res: Response, error: IAppError) => {
    res.status(error.status).send(error);
  };
}
