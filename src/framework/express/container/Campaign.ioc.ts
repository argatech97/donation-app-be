import { ContainerModule } from "inversify";
import { IRoute } from "../common";
import { CampaignRoute, routesIdentifier } from "../routes";
import { CampaignController, ICampaignController, controllerIdentifier } from "../controller";
import {
  CampaignUsecase,
  ICampaignUsecase,
  ICampaignRepository,
  campaignIdentifier,
  CampaignService,
} from "@module/campaign";

export const campaign = new ContainerModule((bind) => {
  bind<ICampaignRepository>(campaignIdentifier.repo).to(CampaignService);
  bind<ICampaignUsecase>(campaignIdentifier.usecase).to(CampaignUsecase);
  bind<ICampaignController>(controllerIdentifier.campaign).to(CampaignController);
  bind<IRoute>(routesIdentifier.campaign).to(CampaignRoute);
});
