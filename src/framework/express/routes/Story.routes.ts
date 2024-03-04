import express, { Router } from "express";
import { IRoute } from "../common";
import { inject, injectable } from "inversify";
import { IStoryController, controllerIdentifier } from "../controller";

@injectable()
export class StoryRoute implements IRoute {
  private controller!: IStoryController;
  private router!: Router;

  constructor(@inject(controllerIdentifier.story) controller: IStoryController) {
    this.router = express.Router();
    this.controller = controller;
    this.configureRoute();
  }

  configureRoute = () => {
    this.router.post(`/create`, this.controller.create);
    this.router.get(`/:id`, this.controller.getDetail);
  };

  getRoute = () => {
    return { router: this.router, prefix: "/story" };
  };
}
