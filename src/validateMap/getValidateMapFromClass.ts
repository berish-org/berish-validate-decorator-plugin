import LINQ from '@berish/linq';
import { ValidateMap, RuleMapType, RuleTupleType, RuleReferenceType } from '@berish/validate';
import { getKeys, getRulesByKey, getFormClass, getFormKeys, SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY } from '../decorate';
import { IClass, SYMBOL_CONSTRUCTOR_ROOT } from '../types';

export function getValidateMapFromClass<T>(
  cls: IClass<T>,
  resolveEmptyFormClass?: (keys: (string | number | symbol)[]) => IClass,
): ValidateMap<T> {
  const cacheFormClassToKeys: [IClass, (string | number | symbol)[]][] = [];
  const _getValidateMapFromClass = <T>(cls: IClass<T>, currentKeys: (string | number | symbol)[]): ValidateMap<any> => {
    // Если класс пустой, то возвращаем null карту
    if (!cls) return null;

    cacheFormClassToKeys.push([cls, currentKeys]);

    // Получаем поля валидация (в том числе рут, если есть)
    let keys = getKeys(cls);
    if (keys.indexOf(SYMBOL_CONSTRUCTOR_ROOT) !== -1) keys = keys.filter(m => m !== SYMBOL_CONSTRUCTOR_ROOT);
    // Означает, что текущий класс имеет валидацию самого себя
    const withRoot = keys.indexOf(SYMBOL_CONSTRUCTOR_ROOT) !== -1;
    // Ключи сложных форм
    const formKeys = getFormKeys(cls);
    const allKeys = LINQ.from([...keys, ...formKeys])
      .distinct()
      .toArray();

    const rootRules = (withRoot && getRulesByKey(cls, SYMBOL_CONSTRUCTOR_ROOT)) || [];

    if (allKeys.length <= 0) return rootRules.length > 0 ? rootRules : null;

    const map = allKeys.reduce<RuleMapType<{ [key: string]: any }>>((out, key) => {
      const isForm = formKeys.indexOf(key) !== -1;
      const rules = getRulesByKey(cls, key);

      if (isForm) {
        const formClassOrEmpty = getFormClass(cls, key);
        if (formClassOrEmpty === SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY && !resolveEmptyFormClass)
          return { ...out, [key]: rules };
        const formClass =
          formClassOrEmpty === SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY
            ? resolveEmptyFormClass([...currentKeys, key])
            : formClassOrEmpty;

        if (!formClass) return { ...out, [key]: rules };

        const cacheValue = cacheFormClassToKeys.filter(([clsCache]) => clsCache === formClass)[0];
        if (cacheValue) {
          const ref: RuleReferenceType = { $$ref: cacheValue[1] };
          return { ...out, [key]: rules.length > 0 ? [rules, ref] : ref };
        }

        const formValidateMap = _getValidateMapFromClass(formClass, [...currentKeys, key]);
        if (formValidateMap) {
          return {
            ...out,
            [key]: rules.length > 0 ? ([rules, formValidateMap] as RuleTupleType<any>) : formValidateMap,
          };
        }
      }
      return rules.length > 0 ? { ...out, [key]: rules } : out;
    }, {});
    return rootRules.length > 0 ? [rootRules, map] : map;
  };
  return _getValidateMapFromClass(cls, []);
}
