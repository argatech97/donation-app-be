import { IHashModule } from "@module/security";
import { injectable } from "inversify";
import bcrypt from "bcrypt";
import { InternalServerError } from "@module/common";

@injectable()
export class Bcrypt implements IHashModule {
  private saltRound = 10;
  hash = async (data: string) => {
    try {
      const res = await bcrypt.hash(data, this.saltRound);
      return res;
    } catch (error) {
      throw new InternalServerError([(error as Error).message]);
    }
  };

  validate = async (data: string, storedHash: string) => {
    try {
      const res = await bcrypt.compare(data, storedHash);
      return res;
    } catch (error) {
      throw new InternalServerError([(error as Error).message]);
    }
  };
}
