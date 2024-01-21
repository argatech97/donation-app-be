import express, { Application } from "express";
import { injectable, inject } from "inversify";
import bodyparser from "body-parser";
import { IWebServer } from "@module/web";
import { types } from "./Types";
import { IExpressRouterCollection } from "./RouterCollection";
@injectable()
export class Express implements IWebServer {
  @inject(types().expressRouterCollection) private x!: IExpressRouterCollection;

  private app: Application = express();
  private port = 8000;

  start = () => {
    this.app.listen(this.port, () => {
      console.log(`Server berjalan di http://localhost:${this.port}`);
    });
  };

  configure = () => {
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: true }));
    this.x.configureRoute(this.app);
  };
}
