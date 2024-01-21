import "reflect-metadata";
import { IWebServer, types } from "@module/web";
import { mainContainer } from "./container";

const expressApp = mainContainer().get<IWebServer>(types().webServer);
expressApp.configure();
expressApp.start();
