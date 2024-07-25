import { IBasicDBClient, IData } from "@module/db";

import { firestore } from "firebase-admin";
import { inject, injectable } from "inversify";
import { types } from "./Types";
import { GatewayTimeout, InternalServerError } from "@module/common";
import { FirebaseFirestoreError } from "firebase-admin/lib/utils/error";

@injectable()
export class BasicFirebase implements IBasicDBClient {
  @inject(types().firestore) private db!: firestore.Firestore;

  formingData(data: IData[]) {
    return data.reduce((acc, el) => {
      return { ...acc, [el.columnName]: el.value };
    }, {});
  }

  errorGateway(error: unknown) {
    const x = error as FirebaseFirestoreError;
    if (x.code) {
      throw new GatewayTimeout([x.message]);
    }
    throw new InternalServerError([x.message]);
  }

  create = async (data: IData[], target: string) => {
    try {
      const x = this.formingData(data);
      await this.db.collection(target).add(x);
    } catch (error) {
      this.errorGateway(error);
    }
  };

  update = async (data: IData[], target: string, id: string) => {
    try {
      const x = this.db.collection(target).doc(id);
      await x.update(this.formingData(data));
    } catch (error) {
      this.errorGateway(error);
    }
  };

  delete = async (id: string, target: string) => {
    try {
      await this.db.collection(target).doc(id).delete();
    } catch (error) {
      this.errorGateway(error);
    }
  };
}
