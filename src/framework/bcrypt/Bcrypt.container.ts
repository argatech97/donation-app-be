import { IHashModule, types } from "@module/security";
import { ContainerModule, interfaces } from "inversify";
import { Bcrypt } from "./Bcrypt";

export function bcryptContainer() {
  return new ContainerModule((bind: interfaces.Bind) => {
    bind<IHashModule>(types().hashModule).to(Bcrypt);
  });
}
