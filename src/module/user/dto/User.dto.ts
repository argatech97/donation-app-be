export interface IUserReqPayloadDto {
  name: string;
  email: string;
  roleId: string;
  password: string;
}

export interface IUser extends Omit<IUserReqPayloadDto, "password"> {
  id: string;
}
