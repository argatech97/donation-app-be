import { IDatabaseClient, databaseIdentifier } from "@module/db";
import { ContainerModule } from "inversify";
import { FirestoreClient } from "../firestore";

export const firestore = new ContainerModule((bind) => {
  bind<IDatabaseClient>(databaseIdentifier.databaseClient).to(FirestoreClient);
});
