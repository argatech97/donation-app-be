import { IPasswordValidator, IValidator } from "@module/validator";
import { ContainerModule, interfaces } from "inversify";
import { types } from "@module/validator";
import { BasicValidator } from "./Validator";
import { PasswordValidatorV1 } from "./PasswordValidator";

export function validatorContainer() {
  const containerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IValidator>(types().basicValidator).to(BasicValidator);
    bind<IPasswordValidator>(types().passwordValidator).to(PasswordValidatorV1);
  });

  return containerModule;
}
