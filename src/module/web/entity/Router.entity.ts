/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISuccessResponse } from "@module/common";

export type RouteMethod = "get" | "post" | "put" | "delete";

export interface IRoute {
  path: string;
  method: RouteMethod;
  handler: (...param: any[]) => Promise<ISuccessResponse<any>>;
}

export class Route implements IRoute {
  constructor(data: IRoute) {
    Object.assign(this, data);
  }
  path!: string;
  method!: RouteMethod;
  handler!: (...param: any[]) => Promise<ISuccessResponse<any>>;
}

export interface IRouter<T> {
  route: IRoute[];
  getRouter: () => T;
}

export interface IWebRouter<T> {
  provideRouter: (routes: IRoute[]) => T;
}

export interface IRouteGetParams {
  query?: any;
  params?: Record<string, string>;
}
