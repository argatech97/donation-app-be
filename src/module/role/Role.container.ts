import { ContainerModule, interfaces } from "inversify";
import { types } from "./Types";
import { IRoleRepository } from "./Role.repository";
import { RoleService } from "./Role.service";
import { CreateRolePayloadReq, ICreateRolePayloadReq, IRoleUC, RoleUC } from "./usecase";
import { IRoleController, RoleController } from "./Role.controller";
import { IRouter } from "@module/web";
import { Router } from "express";
import { RoleRouter } from "./Role.router";

export function roleContainer() {
  return new ContainerModule((bind: interfaces.Bind) => {
    bind<IRoleRepository>(types().repo).to(RoleService);
    bind<IRoleUC>(types().UC).to(RoleUC);
    bind<ICreateRolePayloadReq>(types().createPayloadUC).to(CreateRolePayloadReq);
    bind<IRoleController>(types().controller).to(RoleController);
    bind<IRouter<Router>>(types().router).to(RoleRouter);
  });
}
