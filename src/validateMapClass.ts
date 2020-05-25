import { ValidateMap, RuleTupleType } from '@berish/validate';
import { IClass, SYMBOL_CONSTRUCTOR_ROOT } from './types';
import { getKeys } from './getKeys';
import { getRulesByKey } from './getRules';
import { getFormKeys } from './getFormKeys';
import { getFormClass } from './getFormClass';

export function validateMapClass<T>(cls: IClass): ValidateMap<T> {
  if (!cls) return null;

  const formKeys = getFormKeys(cls);
  let withRoot = false;
  let keys = getKeys(cls);

  if (keys.indexOf(SYMBOL_CONSTRUCTOR_ROOT) !== -1) {
    keys = keys.filter(m => m !== SYMBOL_CONSTRUCTOR_ROOT);
    withRoot = true;
  }

  let validateMap =
    keys.length > 0
      ? keys.reduce<ValidateMap<T>>((out, key) => {
          const isForm = formKeys.indexOf(key) !== -1;
          const formClass = isForm && getFormClass(cls, key);
          const formValidateMap = isForm && validateMapClass(formClass);

          const rules = getRulesByKey(cls, key);
          if (formValidateMap) {
            return { ...out, [key]: [rules, formValidateMap] };
          }
          return { ...out, [key]: rules };
        }, {} as ValidateMap<T>)
      : null;

  if (withRoot) {
    const rootRules = getRulesByKey(cls, SYMBOL_CONSTRUCTOR_ROOT);
    validateMap = validateMap
      ? (([rootRules, validateMap] as any) as ValidateMap<T>)
      : ((rootRules as any) as ValidateMap<T>);
  }
  return validateMap;
}
