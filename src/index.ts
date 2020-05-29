import { usePlugin } from '@berish/validate';
import plugin from './plugin';

const defaultPlugin = plugin();
Object.keys(defaultPlugin).map(key => (plugin[key] = defaultPlugin[key]));

usePlugin(plugin);

export { plugin };
export * from './extension';
