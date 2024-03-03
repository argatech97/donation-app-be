import { ContainerModule } from "inversify";
import {
  AppErrorResponseHanlder,
  IAppErrorResponseHanlder,
  IRoute,
  commonIdentifier,
} from "../common";
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
  bind<IAppErrorResponseHanlder>(commonIdentifier.appErrorResponseHandler).to(
    AppErrorResponseHanlder,
  );
  bind<ICategoryUsecase>(categoryIdentifier.usecase).to(CategoryUsecase);
  bind<ICategoryController>(controllerIdentifier.category).to(CategoryController);
  bind<IRoute>(routesIdentifier.category).to(CategoryRoute);
});
