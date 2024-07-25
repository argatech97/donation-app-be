import { IValidator, Rule, types } from "@module/validator";
import { BadReq, PayloadReqClient } from "../dto";
import { inject, injectable } from "inversify";

export type IRuleProperty<T> = {
  [key in keyof T]: Rule[];
};

export interface ICreatePayloadUC<T> {
  execute: (data: PayloadReqClient, ruleProp: IRuleProperty<T>) => Promise<T>;
}

@injectable()
export class CreatePayloadUC<T> implements ICreatePayloadUC<T> {
  @inject(types().basicValidator) private validator!: IValidator;
  execute = async (data: PayloadReqClient, ruleProp: IRuleProperty<T>) => {
    const x = await Promise.all(
      Object.keys(ruleProp).map((el) =>
        this.validator.execute(el, data[el], ruleProp[el as keyof IRuleProperty<T>]),
      ),
    ).catch((err) => {
      throw err;
    });
    const reqPayload = x.reduce((acc, el) => {
      if (el.isValid && Object.keys(data).indexOf(el.property) !== -1) {
        return { ...acc, [el.property]: data[el.property as keyof T] };
      }
      throw new BadReq([`Invalid value of ${el.property}: ${el.message}`]);
    }, {} as T);

    return reqPayload;
  };
}
