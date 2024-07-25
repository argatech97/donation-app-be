import { ContainerModule, interfaces } from "inversify";
import { IUserRepository } from "./User.repository";
import { UserService } from "./User.service";
import { types } from "./Types";
import { IUserUsecase, UserUsecase, CreateUserReqPayload, ICreateUserReqPayload } from "./usecase";
import { IUserController, UserController } from "./User.controller";
import { IRouter } from "@module/web";
import { Router } from "express";
import { UserRouter } from "./User.router";

export function userContainer() {
  return new ContainerModule((bind: interfaces.Bind) => {
    bind<IUserRepository>(types().userRepo).to(UserService);
    bind<IUserUsecase>(types().userUC).to(UserUsecase);
    bind<ICreateUserReqPayload>(types().createPayloadUserUC).to(CreateUserReqPayload);
    bind<IRouter<Router>>(types().userRouter).to(UserRouter);
    bind<IUserController>(types().userController).to(UserController);
  });
}
