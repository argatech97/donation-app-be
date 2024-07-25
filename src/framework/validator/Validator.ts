import { InternalServerError } from "@module/common";
import { IValidator, Rule, Valid, ValidationRule, Value } from "@module/validator";
import { injectable } from "inversify";
import validator from "validator";

@injectable()
export class BasicValidator implements IValidator {
  violateRuleMessage(rule: Rule) {
    console.log(rule);
    if (rule !== "required") {
      return `value is not ${rule}`;
    }

    return "value is required";
  }

  execute = async (property: string, data: Value, rule: Rule[]) => {
    try {
      const x = rule.map((el) => {
        if (el === "string") {
          return new ValidationRule({
            rule: el,
            isValid: typeof data === "string",
          });
        } else if (el === "number") {
          return new ValidationRule({
            rule: el,
            isValid: validator.isInt(`${data}`),
          });
        } else if (el === "required") {
          return new ValidationRule({
            rule: el,
            isValid: data !== undefined && !validator.isEmpty(`${data}`),
          });
        } else if (el === "email") {
          return new ValidationRule({
            rule: el,
            isValid: validator.isEmail(`${data}`),
          });
        } else if (el === "boolean") {
          return new ValidationRule({
            rule: el,
            isValid: !validator.isBoolean(`${data}`),
          });
        }

        return new ValidationRule({
          rule: "required",
          isValid: true,
        });
      });
      console.log(x);
      return new Valid({
        isValid: !x.some((el) => el.isValid === false),
        property,
        message: x
          .filter((el) => !el.isValid)
          .map((el) => this.violateRuleMessage(el.rule))
          .join(", "),
      });
    } catch (error) {
      throw new InternalServerError([(error as Error).message]);
    }
  };
}
