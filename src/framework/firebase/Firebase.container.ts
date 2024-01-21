import { IBasicDBClient, types } from "@module/db";
import { ContainerModule, interfaces } from "inversify";
import { BasicFirebase } from "./BasicFirebase.implementation";
import admin, { firestore, ServiceAccount } from "firebase-admin";
import { types as firebaseTypes } from "./Types";
import * as serviceAccount from "src/config/serviceAccount.json";

export function firebaseContainer() {
  const firestoreConn = admin
    .initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    })
    .firestore();

  firestoreConn.settings({
    readTimeoutSeconds: 15,
    writeTimeoutSeconds: 10,
  });

  return new ContainerModule((bind: interfaces.Bind) => {
    bind<firestore.Firestore>(firebaseTypes().firestore).toConstantValue(firestoreConn);
    bind<IBasicDBClient>(types().basicDBClient).to(BasicFirebase);
  });
}
