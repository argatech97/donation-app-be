import { Router } from "express";

export interface IRoute {
  configureRoute: () => void;
  getRoute: () => { prefix: string; router: Router };
}
