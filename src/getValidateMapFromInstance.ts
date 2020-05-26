import { IClass } from './types';
import { getValidateMapFromClass } from './getValidateMapFromClass';
import { ValidateMap } from '@berish/validate';

export function getValidateMapFromInstance<T>(instance: T): ValidateMap<T> {
  if (!instance || typeof instance !== 'object') return null;
  const cls: IClass = instance.constructor as IClass;

  return getValidateMapFromClass(cls);
}
