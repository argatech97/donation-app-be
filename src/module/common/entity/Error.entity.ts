export interface IAppError<T = undefined> {
  status: number;
  message: string;
  data?: T;
}

export class BadRequest implements IAppError {
  message: string = "Bad Request";
  status: number = 400;
}

export class InternalServerError implements IAppError {
  message: string = "Internal server error";
  status: number = 500;
}
