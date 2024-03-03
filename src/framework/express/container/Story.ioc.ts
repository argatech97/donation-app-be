import { ContainerModule } from "inversify";
import {
  AppErrorResponseHanlder,
  IAppErrorResponseHanlder,
  IRoute,
  commonIdentifier,
} from "../common";
import { StoryRoute, routesIdentifier } from "../routes";
import { IStoryController, StoryController, controllerIdentifier } from "../controller";
import {
  IStoryRepository,
  storyIdentifier,
  StoryService,
  IStoryUsecase,
  StoryUsecase,
} from "@module/story";

export const story = new ContainerModule((bind) => {
  bind<IStoryRepository>(storyIdentifier.repo).to(StoryService);
  bind<IAppErrorResponseHanlder>(commonIdentifier.appErrorResponseHandler).to(
    AppErrorResponseHanlder,
  );
  bind<IStoryUsecase>(storyIdentifier.usecase).to(StoryUsecase);
  bind<IStoryController>(controllerIdentifier.story).to(StoryController);
  bind<IRoute>(routesIdentifier.story).to(StoryRoute);
});
