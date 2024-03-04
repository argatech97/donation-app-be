import { ICreateResponse, IListResponse, IResponse } from "@module/common";
import {
  ICreateOptions,
  IData,
  IDatabaseClient,
  IFilter,
  IGetByIdOptions,
  IGetOptions,
} from "@module/db";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  getCountFromServer,
  startAfter,
  endBefore,
} from "firebase/firestore";
import { injectable } from "inversify";
import { firebaseConfig } from "@framework/firebase";

@injectable()
export class FirestoreClient implements IDatabaseClient {
  private app!: FirebaseApp;
  private firestore!: Firestore;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.app);
  }

  async create<T extends IData>(options: ICreateOptions<T>): Promise<ICreateResponse> {
    try {
      const docRef = await addDoc(collection(this.firestore, options.tableName), options.data);
      return { data: { id: docRef.id } }; // Respon dari operasi create
    } catch (error) {
      throw new Error(`Error creating document: ${error}`);
    }
  }

  returnWhereClause(filter: IFilter) {
    const { property, operator, value } = filter;
    return where(property, operator, value);
  }

  async get<T>(options: IGetOptions): Promise<IListResponse<T[]>> {
    try {
      const ref = collection(this.firestore, options.tableName);
      let q = query(ref);
      if (options.pagination) {
        const { limit: l, orderBy: ob, isDesc, isNext } = options.pagination;
        q = query(q, limit(l));
        if (ob) {
          q = query(q, orderBy(ob, isDesc ? "desc" : "asc"));
        }
        const { offsetByRecordId } = options;
        if (isNext && offsetByRecordId) {
          q = query(q, startAfter(offsetByRecordId));
        } else if (offsetByRecordId) {
          q = query(q, endBefore(offsetByRecordId));
        }
      }
      const snapshot = await getDocs(q);
      const snapshotCount = await getCountFromServer(q);
      const documents: T[] = [];
      snapshot.forEach((doc) => {
        documents.push(doc.data() as T);
      });
      return {
        data: documents,
        pagination: { ...options.pagination, rowsNumber: snapshotCount.data().count },
      }; // Respon dari operasi get
    } catch (error) {
      throw new Error(`Error getting documents: ${error}`);
    }
  }

  async getById<T>(options: IGetByIdOptions): Promise<IResponse<T>> {
    try {
      const docRef = doc(this.firestore, options.tableName, options.id);
      const docSnapshot = await getDoc(docRef);
      if (!docSnapshot.exists()) {
        throw new Error("Document not found");
      }
      const data = docSnapshot.data() as T;
      return { data }; // Respon dari operasi getById
    } catch (error) {
      throw new Error(`Error getting document by ID: ${error}`);
    }
  }
}
