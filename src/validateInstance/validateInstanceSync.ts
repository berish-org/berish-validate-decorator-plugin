import { validateMapSync } from '@berish/validate';
import { getValidateMapFromInstance } from '../validateMap/getValidateMapFromInstance';

export function validateInstanceSync<T>(obj: T, showOnlyInvalid?: boolean) {
  const validateMap = getValidateMapFromInstance(obj);
  return validateMapSync(obj, validateMap, showOnlyInvalid);
}
