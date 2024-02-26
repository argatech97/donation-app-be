import express, { Router } from "express";
import { IRoutes } from "../common";
import { inject, injectable } from "inversify";
import { IStoryController, controllerIdentifier } from "../controller";

@injectable()
export class StoryRoute implements IRoutes {
  @inject(controllerIdentifier.story) private controller!: IStoryController;
  private router!: Router;

  constructor() {
    this.router = express.Router();
    this.configureRoute();
  }

  configureRoute = () => {
    this.router.post(`/create`, this.controller.create);
    this.router.get(`/:id`, this.controller.getDetail);
  };

  getRoute = () => {
    return { router: this.router, prefix: "story" };
  };
}
