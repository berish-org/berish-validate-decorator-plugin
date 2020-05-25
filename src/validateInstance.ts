import { validateMapSync, validateMapAsync } from '@berish/validate';
import { validateMapInstance } from './validateMapInstance';

export function validateInstanceSync<T>(obj: T, showOnlyInvalid?: boolean) {
  const validateMap = validateMapInstance(obj);
  return validateMapSync(obj, validateMap, showOnlyInvalid);
}

export function validateInstanceAsync<T>(obj: T, showOnlyInvalid?: boolean) {
  const validateMap = validateMapInstance(obj);
  return validateMapAsync(obj, validateMap, showOnlyInvalid);
}
