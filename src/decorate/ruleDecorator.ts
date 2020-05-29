import { IValidateRule } from '@berish/validate';
import LINQ from '@berish/linq';
import { SYMBOL_CONSTRUCTOR_VALIDATORS, IClass, SYMBOL_CONSTRUCTOR_ROOT } from '../types';

export function ruleDecorator(...rules: IValidateRule<any>[]) {
  return function(target: any, key?) {
    const cls: IClass = typeof key === 'undefined' ? target : target.constructor;
    cls[SYMBOL_CONSTRUCTOR_VALIDATORS] = cls[SYMBOL_CONSTRUCTOR_VALIDATORS] || {};
    key = typeof key === 'undefined' ? SYMBOL_CONSTRUCTOR_ROOT : key;
    cls[SYMBOL_CONSTRUCTOR_VALIDATORS][key] = LINQ.from(rules)
      .concat(LINQ.from(cls[SYMBOL_CONSTRUCTOR_VALIDATORS][key]))
      .distinct()
      .toArray();
  };
}
