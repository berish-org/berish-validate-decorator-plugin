import { validateMapAsync } from '@berish/validate';
import { getValidateMapFromInstance } from '../validateMap/getValidateMapFromInstance';

export function validateInstanceAsync<T>(obj: T, showOnlyInvalid?: boolean) {
  const validateMap = getValidateMapFromInstance(obj);
  return validateMapAsync(obj, validateMap, showOnlyInvalid);
}
