import { ValidateMap } from '@berish/validate';
import { of } from '@berish/pathof';
import { getValidateMapFromClass } from './getValidateMapFromClass';
import { IClass } from '../types';
import LINQ from '@berish/linq';

export interface IResultValidateMapPathOf<T> {
  map: ValidateMap<T>;
  instance: T;
}

export function getValidateMapFromPathOf<T>(pathResult: IPathResult<any, T>): IResultValidateMapPathOf<T> {
  if (!pathResult) return null;
  const path = LINQ.from(pathResult.path);
  let currentPath: (string | symbol | number)[] = [];

  let obj = null;
  let cls: IClass<T> = null;
  for (let take = path.count(); take >= 0 && !cls; take--) {
    obj = path
      .take(take)
      .reduce<IPathResult<any, T>>((obj, key) => obj(key), of(pathResult.original))
      .get();
    if (obj && typeof obj === 'object' && obj.constructor) {
      cls = obj.constructor;
      currentPath = path.skip(take);
    }
  }
  return {
    map: getValidateMapFromClass(
      cls,
      keys => {
        const pathResultByKeys = keys.reduce((of, key) => of(key), pathResult);
        const value = pathResultByKeys.get();
        return value && value.constructor;
      },
      [currentPath || []],
    ),
    instance: obj,
  };
}
