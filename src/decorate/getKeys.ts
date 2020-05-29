import LINQ from '@berish/linq';
import { IClass, SYMBOL_CONSTRUCTOR_VALIDATORS, SYMBOL_CONSTRUCTOR_ROOT } from '../types';

export function getKeys(cls: IClass) {
  if (!cls) return [];
  cls[SYMBOL_CONSTRUCTOR_VALIDATORS] = cls[SYMBOL_CONSTRUCTOR_VALIDATORS] || {};
  cls[SYMBOL_CONSTRUCTOR_VALIDATORS][SYMBOL_CONSTRUCTOR_ROOT] =
    cls[SYMBOL_CONSTRUCTOR_VALIDATORS][SYMBOL_CONSTRUCTOR_ROOT] || [];

  const { [SYMBOL_CONSTRUCTOR_ROOT]: root, ...otherKeys } = cls[SYMBOL_CONSTRUCTOR_VALIDATORS];

  const keys = Object.keys(otherKeys);
  const symbols = Object.getOwnPropertySymbols(otherKeys);

  return LINQ.from<string | number | symbol>(keys)
    .map(m => (isNaN(Number(m)) ? m : Number(m)))
    .concat([SYMBOL_CONSTRUCTOR_ROOT, ...symbols])
    .filter(key => {
      const items = cls[SYMBOL_CONSTRUCTOR_VALIDATORS][key as any];
      return items && items.length > 0;
    })
    .toArray();
}
