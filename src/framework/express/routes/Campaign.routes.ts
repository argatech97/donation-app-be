import express, { Router } from "express";
import { IRoute } from "../common";
import { inject, injectable } from "inversify";
import { controllerIdentifier } from "../controller";
import { ICampaignController } from "../controller/Campaign.controller";

@injectable()
export class CampaignRoute implements IRoute {
  private router!: Router;
  @inject(controllerIdentifier.campaign) private controller!: ICampaignController;
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
