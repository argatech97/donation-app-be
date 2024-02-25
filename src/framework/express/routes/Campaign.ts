import express from "express";
import { IRoutes } from "../common";
import { inject, injectable } from "inversify";
import { ControllerIdentifier } from "../controller";
import { ICampaignController } from "../controller/Campaign";

@injectable()
export class CampaignRoute implements IRoutes {
  private router = express.Router();
  @inject(new ControllerIdentifier().campaign) private controller!: ICampaignController;
  constructor() {
    this.configureRoute();
  }
  configureRoute = () => {
    this.router.post("/create", this.controller.create);
    this.router.get("/list", this.controller.get);
  };
  getRoute = () => {
    return this.router;
  };
}
