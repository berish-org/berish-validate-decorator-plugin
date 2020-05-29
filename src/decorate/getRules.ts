import { IClass, SYMBOL_CONSTRUCTOR_VALIDATORS } from '../types';

export function getRulesByKey(constructor: IClass, key: any) {
  if (!constructor) return [];
  constructor[SYMBOL_CONSTRUCTOR_VALIDATORS] = constructor[SYMBOL_CONSTRUCTOR_VALIDATORS] || {};
  constructor[SYMBOL_CONSTRUCTOR_VALIDATORS][key] = constructor[SYMBOL_CONSTRUCTOR_VALIDATORS][key] || [];
  return constructor[SYMBOL_CONSTRUCTOR_VALIDATORS][key];
}
