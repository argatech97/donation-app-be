import { Router } from "express";

export interface IRoutes {
  configureRoute: () => void;
  getRoute: () => Router;
}
