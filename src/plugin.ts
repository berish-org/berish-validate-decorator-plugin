import { IRulePluginDefault } from '@berish/validate';
import { validateInstanceSync, validateInstanceAsync } from './validateInstance';
import { getValidateMapFromClass } from './getValidateMapFromClass';
import { getValidateMapFromInstance } from './getValidateMapFromInstance';
import { ruleForm } from './ruleForm';
import { ruleDecorator } from './ruleDecorator';

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
        ruleForm,
      };
    },
  };
};

export default plugin;
