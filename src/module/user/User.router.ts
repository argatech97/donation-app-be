import { IRoute, IRouter, IWebRouter, Route, types } from "@module/web";
import { types as userTypes } from "./Types";
import { IUserController } from "./User.controller";
import { inject, injectable } from "inversify";
@injectable()
export class UserRouter<T> implements IRouter<T> {
  @inject(types().webRouter) private webRouter!: IWebRouter<T>;
  @inject(userTypes().userController) private controller!: IUserController;

  route: IRoute[] = [];
  getRouter = () => {
    this.route.push(
      new Route({
        method: "post",
        path: "/create",
        handler: this.controller.createUser.bind(this.controller),
      }),
    );
    const x = this.webRouter.provideRouter(this.route);
    return x;
  };
}
