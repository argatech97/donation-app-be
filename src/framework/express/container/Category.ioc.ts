import { ContainerModule } from "inversify";
import { IRoute } from "../common";
import { CategoryRoute, routesIdentifier } from "../routes";
import { CategoryController, ICategoryController, controllerIdentifier } from "../controller";
import {
  CategoryService,
  CategoryUsecase,
  ICategoryUsecase,
  categoryIdentifier,
  ICategoryRepository,
} from "@module/category";

export const category = new ContainerModule((bind) => {
  bind<ICategoryRepository>(categoryIdentifier.repo).to(CategoryService);
  bind<ICategoryUsecase>(categoryIdentifier.usecase).to(CategoryUsecase);
  bind<ICategoryController>(controllerIdentifier.category).to(CategoryController);
  bind<IRoute>(routesIdentifier.category).to(CategoryRoute);
});
