import { ValidateMap } from '@berish/validate';
import { of } from '@berish/pathof';
import { getValidateMapFromClass } from './getValidateMapFromClass';
import { IClass } from '../types';

export function getValidateMapFromInstance<T>(instance: T): ValidateMap<T> {
  if (!instance || typeof instance !== 'object') return null;
  const pathResultInstance: IPathResult<any, T> = of(instance);
  const cls = instance.constructor as IClass<T>;
  return getValidateMapFromClass(cls, keys => {
    const pathResultByKeys = keys.reduce((of, key) => of(key), pathResultInstance);
    const value = pathResultByKeys.get();
    return value && value.constructor;
  });
}
