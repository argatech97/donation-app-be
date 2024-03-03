import express, { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { IWebServer } from "@module/server";
import { routesIdentifier } from "./routes";
import { IRoute } from "./common";

@injectable()
export class Express implements IWebServer {
  @inject(routesIdentifier.routes) private routes!: IRoute[];
  private app: Application;

  constructor() {
    this.app = express();
  }

  start = (port: number) => {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  };

  loadConfig = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.routes.forEach((el) => {
      const { prefix, router } = el.getRoute();
      this.app.use(prefix, router);
    });
  };

  loadRoutes = () => {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, server is working");
    });
  };
}
