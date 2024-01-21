import { ContainerModule, interfaces } from "inversify";
import { types } from "./Types";
import { CreatePayloadUC } from "./usecase";

export function commonContainer() {
  return new ContainerModule((bind: interfaces.Bind) => {
    bind(types().createPayloadUC).to(CreatePayloadUC);
  });
}
