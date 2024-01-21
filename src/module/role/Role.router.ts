import { IRoute, IRouter, IWebRouter, Route } from "@module/web";
import { inject, injectable } from "inversify";
import { types } from "./Types";
import { IRoleController } from "./Role.controller";
import { types as webTypes } from "@module/web";

@injectable()
export class RoleRouter<T> implements IRouter<T> {
  @inject(types().controller) private x!: IRoleController;
  @inject(webTypes().webRouter) private y!: IWebRouter<T>;
  route: IRoute[] = [];
  getRouter = () => {
    this.route = [
      new Route({
        path: "/create",
        method: "post",
        handler: this.x.createRole.bind(this.x),
      }),
    ];

    return this.y.provideRouter(this.route);
  };
}
