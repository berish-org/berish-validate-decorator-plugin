import { IClass } from '../types';

export const SYMBOL_CONSTRUCTOR_FORM_KEYS = Symbol('constructorFormKeys');
export const SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY = Symbol('constructorFormKeyEmpty');

export function ruleForm(formClass?: IClass) {
  return function(target, key) {
    const cls: IClass = target.constructor;
    cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] = cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] || {};
    if (!cls[SYMBOL_CONSTRUCTOR_FORM_KEYS][key])
      cls[SYMBOL_CONSTRUCTOR_FORM_KEYS][key] = SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY;
    if (formClass) cls[SYMBOL_CONSTRUCTOR_FORM_KEYS][key] = formClass;
  };
}
