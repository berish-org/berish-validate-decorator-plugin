import { IRulePluginDefault } from '@berish/validate';
import { validateInstanceSync, validateInstanceAsync } from './validateInstance';
import { getValidateMapFromClass, getValidateMapFromInstance, getValidateMapFromPathOf } from './validateMap';
import { ruleForm, ruleDecorator } from './decorate';

const plugin: IRulePluginDefault<{}> = params => {
  return {
    upgradeRuleAfterInit: rule => {
      rule.decorator = ruleDecorator(rule);
      return rule;
    },
    upgradeMethods: obj => {
      return {
        validateInstanceSync,
        validateInstanceAsync,
        getValidateMapFromClass,
        getValidateMapFromInstance,
        getValidateMapFromPathOf,
        ruleForm,
      };
    },
  };
};

export default plugin;
