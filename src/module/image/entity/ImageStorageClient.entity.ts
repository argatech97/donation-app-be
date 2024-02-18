import { IDownloadFileResponse, IResponse } from "@module/common";

export interface IImageStorageClient {
  upload: (file: File, path?: string) => Promise<IResponse<IDownloadFileResponse>>;
  download: (path: string) => Promise<IResponse<IDownloadFileResponse>>;
}
