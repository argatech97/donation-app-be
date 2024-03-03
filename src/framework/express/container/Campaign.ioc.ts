import { ContainerModule } from "inversify";
import {
  AppErrorResponseHanlder,
  IAppErrorResponseHanlder,
  IRoute,
  commonIdentifier,
} from "../common";
import { CampaignRoute, routesIdentifier } from "../routes";
import { CampaignController, ICampaignController, controllerIdentifier } from "../controller";
import {
  CampaignUsecase,
  ICampaignUsecase,
  ICampaignRepository,
  campaignIdentifier,
  CampaignService,
} from "@module/campaign";

export const campaign = () => {
  const container = new ContainerModule((bind) => {
    bind<ICampaignRepository>(campaignIdentifier.repo).to(CampaignService);
    bind<IAppErrorResponseHanlder>(commonIdentifier.appErrorResponseHandler).to(
      AppErrorResponseHanlder,
    );
    bind<ICampaignUsecase>(campaignIdentifier.usecase).to(CampaignUsecase);
    bind<ICampaignController>(controllerIdentifier.campaign).to(CampaignController);
    bind<IRoute>(routesIdentifier.campaign).to(CampaignRoute);
  });
  return container;
};
