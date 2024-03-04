import "reflect-metadata";
import { IWebServer } from "@module/server";
import { express } from "./framework/express";
import { frameworkIdentifier } from "./framework";
const app = express().get<IWebServer>(frameworkIdentifier.express);
app.start(3000);
