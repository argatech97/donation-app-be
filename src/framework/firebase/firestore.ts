import { ICreateResponse, IFilter, IListResponse, IResponse } from "@module/common";
import { ICreateOptions, IData, IDatabaseClient, IGetByIdOptions, IGetOptions } from "@module/db";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
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
} from "firebase/firestore";
import { inject, injectable } from "inversify";
import { firebaseIdentifier } from "./Identifier";

@injectable()
export class FirestoreClient implements IDatabaseClient {
  @inject(firebaseIdentifier.config) private config!: FirebaseOptions;
  private app!: FirebaseApp;
  private firestore!: Firestore;

  constructor() {
    this.app = initializeApp(this.config);
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
        const { limit, page, sortBy, isDesc } = options.pagination;
        q = query(q, limit())
      }
      const snapshot = await getDocs();
      const documents: T[] = [];
      snapshot.forEach((doc) => {
        documents.push(doc.data() as T);
      });
      return { data: documents, pagination: options.pagination }; // Respon dari operasi get
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
