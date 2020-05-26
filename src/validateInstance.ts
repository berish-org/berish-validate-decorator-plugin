import { validateMapSync, validateMapAsync } from '@berish/validate';
import { getValidateMapFromInstance } from './getValidateMapFromInstance';

export function validateInstanceSync<T>(obj: T, showOnlyInvalid?: boolean) {
  const validateMap = getValidateMapFromInstance(obj);
  return validateMapSync(obj, validateMap, showOnlyInvalid);
}

export function validateInstanceAsync<T>(obj: T, showOnlyInvalid?: boolean) {
  const validateMap = getValidateMapFromInstance(obj);
  return validateMapAsync(obj, validateMap, showOnlyInvalid);
}
