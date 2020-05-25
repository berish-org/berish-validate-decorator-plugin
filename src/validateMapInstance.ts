import { IClass } from './types';
import { validateMapClass } from './validateMapClass';
import { ValidateMap } from '@berish/validate';

export function validateMapInstance<T>(instance: T) {
  if (!instance || typeof instance !== 'object') return null;
  const cls: IClass = instance.constructor as IClass;

  return validateMapClass(cls) as ValidateMap<T>;
}
