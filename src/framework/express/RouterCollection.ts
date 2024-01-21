import { inject, injectable } from "inversify";
import { IRouter } from "@module/web";
import { Application, Router } from "express";
import { types as userTypes } from "@module/user";
import { types as roleTypes } from "@module/role";

export interface IExpressRouterCollection {
  configureRoute: (app: Application) => void;
}

@injectable()
export class ExpressRouterCollection implements IExpressRouterCollection {
  @inject(userTypes().userRouter) private userRouter!: IRouter<Router>;
  @inject(roleTypes().router) private roleRouter!: IRouter<Router>;

  configureRoute(app: Application) {
    app.use("/user", this.userRouter.getRouter());
    app.use("/role", this.roleRouter.getRouter());
  }
}
