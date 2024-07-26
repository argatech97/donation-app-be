import { userContainer } from "@module/user";
import { Container } from "inversify";
import {
  bcryptContainer,
  expressContainer,
  firebaseContainer,
  validatorContainer,
} from "@framework/index";
import { commonContainer } from "@module/common";
import { roleContainer } from "@module/role";

export function mainContainer() {
  const x = new Container();
  x.load(
    bcryptContainer(),
    commonContainer(),
    validatorContainer(),
    userContainer(),
    firebaseContainer(),
    expressContainer(),
    roleContainer(),
  );
  return x;
}
