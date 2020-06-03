import {
  validateInstanceSync as validateInstanceSyncDirect,
  validateInstanceAsync as validateInstanceAsyncDirect,
} from './validateInstance';
import {
  getValidateMapFromClass as getValidateMapFromClassDirect,
  getValidateMapFromInstance as getValidateMapFromInstanceDirect,
  getValidateMapFromPathOf as getValidateMapFromPathOfDirect,
} from './validateMap';
import { ruleForm as ruleFormDirect, ruleDecorator as ruleDecoratorDirect } from './decorate';

declare module '@berish/validate/build/rule/types' {
  export interface IValidateRule<Body extends any[]> {
    decorator: (target: any, key?: any) => void;
  }
}

declare module '@berish/validate' {
  export const validateInstanceSync: typeof validateInstanceSyncDirect;
  export const validateInstanceAsync: typeof validateInstanceAsyncDirect;
  export const getValidateMapFromClass: typeof getValidateMapFromClassDirect;
  export const getValidateMapFromInstance: typeof getValidateMapFromInstanceDirect;
  export const getValidateMapFromPathOf: typeof getValidateMapFromPathOfDirect;
  export const ruleForm: typeof ruleFormDirect;
  export const ruleDecorator: typeof ruleDecoratorDirect;
}
