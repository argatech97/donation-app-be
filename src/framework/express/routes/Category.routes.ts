import express, { Router } from "express";
import { inject, injectable } from "inversify";
import { ICategoryController, controllerIdentifier } from "../controller";
import { IRoute } from "../common";

@injectable()
export class CategoryRoute implements IRoute {
  private router: Router;
  private controller: ICategoryController;
  constructor(@inject(controllerIdentifier.category) controller: ICategoryController) {
    this.router = express.Router();
    this.controller = controller;
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
