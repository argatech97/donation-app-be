import { IData } from "@module/db";
import { IStory } from "./Story.entity";

export interface IStoryRequestPayload extends Omit<IStory, "id">, IData {}
