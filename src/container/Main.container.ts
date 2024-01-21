import { userContainer } from "@module/user";
import { expressContainer } from "@framework/express";
import { Container } from "inversify";
import { firebaseContainer } from "@framework/firebase";
import { validatorContainer } from "@framework/validator";
import { commonContainer } from "@module/common";
import { roleContainer } from "@module/role";
export function mainContainer() {
  const x = new Container();
  x.load(
    commonContainer(),
    validatorContainer(),
    userContainer(),
    firebaseContainer(),
    expressContainer(),
    roleContainer(),
  );
  return x;
}
