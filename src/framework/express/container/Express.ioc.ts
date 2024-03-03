import { Container } from "inversify";
import { IWebServer } from "@module/server";
import { Express, frameworkIdentifier } from "@framework/.";
import { IRoute } from "@framework/express/common";
import { firestore } from "@framework/firebase";
import { campaign, category, story } from ".";
import { routesIdentifier } from "@framework/express/routes";

export const express = () => {
  const container = new Container();
  container.load(firestore, campaign, category, story);
  const routes: IRoute[] = [
    container.get<IRoute>(routesIdentifier.campaign),
    container.get<IRoute>(routesIdentifier.category),
    container.get<IRoute>(routesIdentifier.story),
  ];
  container.bind<IRoute[]>(routesIdentifier.routes).toConstantValue(routes);
  container.bind<IWebServer>(frameworkIdentifier.express).to(Express);
  return container;
};
