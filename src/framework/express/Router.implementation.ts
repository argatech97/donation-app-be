import { IFailResponse } from "@module/common";
import { IWebRouter, IRoute, IRouteGetParams } from "@module/web";
import { Request, Response, IRouter } from "express";
import { inject, injectable } from "inversify";
import { types } from "./Types";
import { types as userTypes } from "@module/user";
import { IUserController } from "@module/user/User.controller";
@injectable()
export class ExpressRouter implements IWebRouter<IRouter> {
  @inject(types().expressRouter) private router!: IRouter;
  @inject(userTypes().userController) private userController!: IUserController;
  provideRouter = (routes: IRoute[]) => {
    routes.forEach((el) => {
      switch (el.method) {
        case "get" || "delete":
          this.router[el.method](el.path, (req: Request, res: Response) => {
            const routeParams: IRouteGetParams = {
              query: req.query,
              params: req.params,
            };
            el.handler(routeParams)
              .then((data) => {
                res.status(data.status).send(data);
              })
              .catch((err) => {
                const x = err as IFailResponse;
                res.status(x.status).send(x);
              });
          });
          break;
        case "post" || "put":
          this.router[el.method](el.path, (req: Request, res: Response) => {
            el.handler(req.body)
              .then((data) => {
                res.status(data.status).send(data);
              })
              .catch((err) => {
                const x = err as IFailResponse;
                res.status(x.status).send(x);
              });
          });
          break;
        default:
          break;
      }
    });

    return this.router;
  };
}
