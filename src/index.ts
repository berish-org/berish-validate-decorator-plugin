import plugin from './plugin';

const defaultPlugin = plugin();
Object.keys(defaultPlugin).map(key => (plugin[key] = defaultPlugin[key]));

export { plugin };
export * from './decorate';
export * from './validateMap';
export * from './extension';
export * from './plugin';
export * from './types';
export * from './validateInstance';
