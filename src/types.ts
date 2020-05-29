import { IValidateRule } from '@berish/validate';
import { SYMBOL_CONSTRUCTOR_FORM_KEYS, SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY } from './decorate';

export const SYMBOL_CONSTRUCTOR_VALIDATORS = Symbol('constructorValidators');
export const SYMBOL_CONSTRUCTOR_ROOT = Symbol('constructorRoot');

export interface IClass<T = any> {
  [SYMBOL_CONSTRUCTOR_VALIDATORS]?: {
    [SYMBOL_CONSTRUCTOR_ROOT]?: IValidateRule<any>[];
    [propertyKey: string]: IValidateRule<any>[];
  };
  [SYMBOL_CONSTRUCTOR_FORM_KEYS]?: {
    [propertyKey: string]: IClass | typeof SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY;
  };
  new (...args: any[]): T;
}
