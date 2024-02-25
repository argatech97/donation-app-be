import express, { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { IWebServer } from "@module/server";
import { RoutesIdentifier } from "./routes";
import { IRoutes } from "./common";

@injectable()
export class Express implements IWebServer {
  @inject(new RoutesIdentifier().routes) private routes!: IRoutes[];
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
      this.app.use(el.getRoute());
    });
  };

  loadRoutes = () => {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, server is working");
    });
  };
}
