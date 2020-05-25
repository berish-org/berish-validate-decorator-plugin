import plugin from './plugin';

const defaultPlugin = plugin();
Object.keys(defaultPlugin).map(key => (plugin[key] = defaultPlugin[key]));

export { plugin };
export * from './extension';
export * from './getFormClass';
export * from './getFormKeys';
export * from './getKeys';
export * from './getRules';
export * from './plugin';
export * from './ruleDecorator';
export * from './ruleForm';
export * from './types';
export * from './validateInstance';
export * from './validateMapClass';
export * from './validateMapInstance';
