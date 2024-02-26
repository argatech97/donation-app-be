import express, { Router } from "express";
import { IRoutes } from "../common";
import { inject, injectable } from "inversify";
import { ControllerIdentifier } from "../controller";
import { ICampaignController } from "../controller/Campaign";

@injectable()
export class CampaignRoute implements IRoutes {
  private router!: Router;
  @inject(new ControllerIdentifier().campaign) private controller!: ICampaignController;
  constructor() {
    this.router = express.Router();
    this.configureRoute();
  }
  configureRoute = () => {
    this.router.post("/create", this.controller.create);
    this.router.get("/list", this.controller.get);
  };
  getRoute = () => {
    return { router: this.router, prefix: "campaign" };
  };
}
