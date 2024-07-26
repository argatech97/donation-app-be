export type Rule = "required" | "number" | "string" | "boolean" | "email";
export type Value = string | boolean | number | undefined;

export interface isValid {
  property: string;
  isValid: boolean;
  message?: string;
}

export class Valid implements isValid {
  constructor(data: isValid) {
    Object.assign(this, data);
  }
  property!: string;
  isValid!: boolean;
  message?: string | undefined;
}

export interface IValidationRule {
  rule: Rule;
  isValid: boolean;
}

export class ValidationRule implements IValidationRule {
  constructor(data: IValidationRule) {
    Object.assign(this, data);
  }
  rule!: Rule;
  isValid!: boolean;
}

export interface IValidator {
  execute: (property: string, data: Value, rule: Rule[]) => Promise<isValid>;
}

export interface IPasswordValidator {
  execute: (value: string) => Promise<isValid>;
}
