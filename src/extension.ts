import * as validate from '@berish/validate';
import {
  validateInstanceSync as validateInstanceSyncDirect,
  validateInstanceAsync as validateInstanceAsyncDirect,
} from './validateInstance';
import { validateMapClass as validateMapClassDirect } from './validateMapClass';
import { validateMapInstance as validateMapInstanceDirect } from './validateMapInstance';
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
  export const validateMapClass: typeof validateMapClassDirect;
  export const validateMapInstance: typeof validateMapInstanceDirect;
  export const ruleForm: typeof ruleFormDirect;
  export const ruleDecorator: typeof ruleDecoratorDirect;
}

Object.defineProperty(validate, 'validateInstanceSync', { value: validateInstanceSyncDirect });
Object.defineProperty(validate, 'validateInstanceAsync', { value: validateInstanceAsyncDirect });
Object.defineProperty(validate, 'validateMapClass', { value: validateMapClassDirect });
Object.defineProperty(validate, 'validateMapInstance', { value: validateMapInstanceDirect });
Object.defineProperty(validate, 'ruleForm', { value: ruleFormDirect });
Object.defineProperty(validate, 'ruleDecorator', { value: ruleDecoratorDirect });
