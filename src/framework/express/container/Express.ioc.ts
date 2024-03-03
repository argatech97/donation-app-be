import { Container } from "inversify";
import { IWebServer } from "@module/server";
import { Express, frameworkIdentifier } from "@framework/index";
import { IRoute } from "@framework/express/common";
import { routesIdentifier } from "@framework/express/routes";

export const express = () => {
  const container = new Container();
  const routes: IRoute[] = [];
  container.bind<IRoute[]>(routesIdentifier.routes).toConstantValue(routes);
  container.bind<IWebServer>(frameworkIdentifier.express).to(Express);
  return container;
};
