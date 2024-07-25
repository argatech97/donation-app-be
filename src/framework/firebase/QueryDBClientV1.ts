import { IOptions, IQueryDBClientV1 } from "@module/db";
import { inject, injectable } from "inversify";
import { types } from "./Types";
import { firestore } from "firebase-admin";
import { FirebaseFirestoreError } from "firebase-admin/lib/utils/error";
import { GatewayTimeout, InternalServerError } from "@module/common";

@injectable()
export class QueryDBClientFirestore implements IQueryDBClientV1 {
  @inject(types().firestore) private db!: firestore.Firestore;

  errorGateway(error: unknown) {
    const x = error as FirebaseFirestoreError;
    if (x.code) {
      throw new GatewayTimeout([x.message]);
    }
    throw new InternalServerError([x.message]);
  }

  getById = async (options: IOptions, id: string) => {
    try {
      const { target, column } = options;
      const x = this.db.collection(target);
      if (column) x.select(...column);
      const res = await x.doc(id).get();
      return {
        ...res.data(),
      };
    } catch (error) {
      throw this.errorGateway(error);
    }
  };

  getList = async (options: IOptions) => {
    try {
      const { pagination, target, column, condition } = options;
      const x = this.db.collection(target);

      if (column) x.select(...column);

      if (pagination) {
        const { limit, orderBy, page } = pagination;
        x.offset((page - 1) * limit).limit(limit);
        if (orderBy) x.orderBy(orderBy);
      }

      if (condition) {
        condition.forEach((el) => {
          switch (el.operator) {
            case "OR":
              x.where(el.data.columnName, "in", el.data.value);
              break;
            default:
              x.where(el.data.columnName, el.operator, el.data.value);
              break;
          }
        });
      }

      const res = await x.get();
      const total = await this.db.collection(target).count().get();

      return {
        data: res.docs.map((el) => ({ ...el.data(), id: el.id })),
        totalData: total.data().count,
      };
    } catch (error) {
      throw this.errorGateway(error);
    }
  };
}
