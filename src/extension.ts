import {
  validateInstanceSync as validateInstanceSyncDirect,
  validateInstanceAsync as validateInstanceAsyncDirect,
} from './validateInstance';
import { getValidateMapFromClass as getValidateMapFromClassDirect } from './getValidateMapFromClass';
import { getValidateMapFromInstance as getValidateMapFromInstanceDirect } from './getValidateMapFromInstance';
import { ruleForm as ruleFormDirect } from './ruleForm';
import { ruleDecorator as ruleDecoratorDirect } from './ruleDecorator';

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
  export const ruleForm: typeof ruleFormDirect;
  export const ruleDecorator: typeof ruleDecoratorDirect;
}
