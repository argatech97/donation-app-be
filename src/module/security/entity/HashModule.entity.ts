export interface IHashModule {
  hash: (data: string) => Promise<string>;
  validate: (data: string, storedHash: string) => Promise<boolean>;
}
