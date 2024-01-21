import { IWebServer, IWebRouter, types } from "@module/web";
import { types as expressTypes } from "./Types";
import { ContainerModule, interfaces } from "inversify";
import { Express } from "./Express.implementation";
import { ExpressRouter } from "./Router.implementation";
import { IRouter, Router } from "express";
import { ExpressRouterCollection, IExpressRouterCollection } from "./RouterCollection";

export function expressContainer() {
  return new ContainerModule((bind: interfaces.Bind) => {
    bind<IExpressRouterCollection>(expressTypes().expressRouterCollection).to(
      ExpressRouterCollection,
    );
    bind<IRouter>(expressTypes().expressRouter).toConstantValue(Router());
    bind<IWebRouter<Router>>(types().webRouter).to(ExpressRouter);
    bind<IWebServer>(types().webServer).to(Express);
  });
}
