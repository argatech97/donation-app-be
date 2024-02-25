import { IAppError, InternalServerError } from "@module/common";
import { Response } from "express";
import { injectable } from "inversify";

export interface IAppErrorResponseHanlder {
  execute: (res: Response, error: unknown) => void;
}

@injectable()
export class AppErrorResponseHanlder implements IAppErrorResponseHanlder {
  execute = (res: Response, error: unknown) => {
    const appError = error as IAppError;
    if (appError.status) {
      res.status(appError.status).send(appError);
      return;
    }
    res.status(500).send(new InternalServerError());
    return;
  };
}
