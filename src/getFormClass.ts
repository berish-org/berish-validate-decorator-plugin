import { IClass, SYMBOL_CONSTRUCTOR_FORM_KEYS } from './types';

export function getFormClass(cls: IClass, key: any) {
  if (!cls) return null;
  cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] = cls[SYMBOL_CONSTRUCTOR_FORM_KEYS] || {};
  return cls[SYMBOL_CONSTRUCTOR_FORM_KEYS][key];
}
