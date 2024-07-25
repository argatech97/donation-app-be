import { IPasswordValidator, Valid } from "@module/validator";
import { injectable } from "inversify";
import validator from "validator";

@injectable()
export class PasswordValidatorV1 implements IPasswordValidator {
  execute = async (password: string) => {
    const errors = [];

    if (!validator.isLength(password, { min: 8 })) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return new Valid({
      isValid: errors.length === 0,
      property: "password",
      message: errors.join(", "),
    });
  };
}
