import { IDatabaseClient, databaseIdentifier } from "@module/db";
import { ContainerModule } from "inversify";
import { FirestoreClient } from "../firestore";
import { FirebaseOptions } from "firebase/app";
import { firebaseIdentifier } from "../Identifier";
import { firebaseConfig } from "../config";

export const firestore = new ContainerModule((bind) => {
  bind<FirebaseOptions>(firebaseIdentifier.config).toConstantValue(firebaseConfig);
  bind<IDatabaseClient>(databaseIdentifier.databaseClient).to(FirestoreClient);
});
