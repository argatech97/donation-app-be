import { IDownloadFileResponse, IResponse } from "@module/common";
import { inject, injectable } from "inversify";
import { IImageStorageClient, ImageStorageIdentifier } from "../entity";

export interface IImageStorageClientUsecase {
  upload: (file: File, path?: string) => Promise<IResponse<IDownloadFileResponse>>;
}

@injectable()
export class ImageStorageClientUsecase implements IImageStorageClientUsecase {
  @inject(new ImageStorageIdentifier().imageStorageClient) private x!: IImageStorageClient;
  upload = async (file: File, path?: string) => {
    return this.x.upload(file, path);
  };
}
