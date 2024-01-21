import { IValidator } from "@module/validator";
import { ContainerModule, interfaces } from "inversify";
import { types } from "@module/validator";
import { BasicValidator } from "./Validator";

export function validatorContainer() {
  const containerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IValidator>(types().basicValidator).to(BasicValidator);
  });

  return containerModule;
}
