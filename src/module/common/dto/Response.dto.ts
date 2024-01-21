export interface ISuccessResponse<T> {
  status: number;
  data?: T;
}

export interface IFailResponse {
  status: number;
  messageStatus: string;
  messages?: string[];
}

export class SuccesCreateRes implements ISuccessResponse<void> {
  status: number = 201;
}

export class BadReq implements IFailResponse {
  constructor(data: string[]) {
    this.messages = data;
  }
  status: number = 400;
  messageStatus: string = "Bad Request";
  messages: string[];
}

export class InternalServerError implements IFailResponse {
  constructor(data: string[]) {
    this.messages = data;
  }
  status: number = 500;
  messageStatus: string = "Internal Server Error";
  messages: string[];
}

export class GatewayTimeout implements IFailResponse {
  constructor(data: string[]) {
    this.messages = data;
  }
  status: number = 504;
  messageStatus: string = "Bad Gateway";
  messages: string[];
}
