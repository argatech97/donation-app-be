import express, { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { IWebServer } from "@module/server";
import { routesIdentifier } from "./routes";
import { IRoute } from "./common";

@injectable()
export class Express implements IWebServer {
  private routes: IRoute[];
  private app: Application;

  constructor(@inject(routesIdentifier.routes) routes: IRoute[]) {
    this.routes = routes;
    this.app = express();
    this.loadConfig();
    this.loadRoutes();
  }

  start = (port: number) => {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  };

  loadConfig = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  loadRoutes = () => {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Server is working");
    });
    this.routes.forEach((el) => {
      const { prefix, router } = el.getRoute();
      this.app.use(prefix, router);
    });
  };
}
