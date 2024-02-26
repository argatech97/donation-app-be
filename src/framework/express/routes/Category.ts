import express, { Router } from "express";
import { inject, injectable } from "inversify";
import { ICategoryController, controllerIdentifier } from "../controller";
import { IRoutes } from "../common";

@injectable()
export class CategoryRoutes implements IRoutes {
  private router: Router;
  @inject(controllerIdentifier.category) private controller!: ICategoryController;
  constructor() {
    this.router = express.Router();
    this.configureRoute();
  }

  configureRoute = () => {
    this.router.post(`/create`, this.controller.create);
    this.router.get(`/list`, this.controller.get);
  };

  getRoute = () => {
    return { router: this.router, prefix: "category" };
  };
}
