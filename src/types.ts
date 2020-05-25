import { IValidateRule } from '@berish/validate';

export const SYMBOL_CONSTRUCTOR_VALIDATORS = Symbol('constructorValidators');
export const SYMBOL_CONSTRUCTOR_ROOT = Symbol('constructorRoot');
export const SYMBOL_CONSTRUCTOR_FORM_KEYS = Symbol('constructorFormKeys');

export interface IClass {
  [SYMBOL_CONSTRUCTOR_VALIDATORS]?: {
    [SYMBOL_CONSTRUCTOR_ROOT]?: IValidateRule<any>[];
    [propertyKey: string]: IValidateRule<any>[];
  };
  [SYMBOL_CONSTRUCTOR_FORM_KEYS]?: {
    [propertyKey: string]: IClass;
  };
  new (...args: any[]): any;
}
