export interface IAppError {
  status: number;
  message: string;
}

export class BadRequest implements IAppError {
  message: string = "Bad Request";
  status: number = 400;
}
