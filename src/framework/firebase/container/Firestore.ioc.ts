import { IDatabaseClient, databaseIdentifier } from "@module/db";
import { Container } from "inversify";
import { FirestoreClient } from "../firestore";
import { FirebaseOptions } from "firebase/app";
import { firebaseIdentifier } from "../Identifier";
import { firebaseConfig } from "../config";

export const firestore = () => {
  const container = new Container();
  container.bind<FirebaseOptions>(firebaseIdentifier.config).toConstantValue(firebaseConfig);
  container.bind<IDatabaseClient>(databaseIdentifier.databaseClient).to(FirestoreClient);
  return container;
};
