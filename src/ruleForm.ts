import { IClass, SYMBOL_CONSTRUCTOR_FORM_KEYS, SYMBOL_CONSTRUCTOR_ROOT } from './types';
import LINQ from '@berish/linq';

export function ruleForm(formClass?: IClass) {
  return function(target, key) {
    const cls: IClass = target.constructor;
    cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] = cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] || {};
    cls[SYMBOL_CONSTRUCTOR_FORM_KEYS][key] = formClass;
  };
}
