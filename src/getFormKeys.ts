import LINQ from '@berish/linq';
import { IClass, SYMBOL_CONSTRUCTOR_FORM_KEYS, SYMBOL_CONSTRUCTOR_ROOT } from './types';

export function getFormKeys(cls: IClass) {
  if (!cls) return [];
  cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] = cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] || {};

  const keys = Object.keys(cls[SYMBOL_CONSTRUCTOR_FORM_KEYS]);
  const symbols = Object.getOwnPropertySymbols(cls[SYMBOL_CONSTRUCTOR_FORM_KEYS]);

  return LINQ.from<string | number | symbol>(keys)
    .map(m => (isNaN(Number(m)) ? m : Number(m)))
    .concat(symbols)
    .filter(key => !!cls[SYMBOL_CONSTRUCTOR_FORM_KEYS][key as any])
    .toArray();
}
