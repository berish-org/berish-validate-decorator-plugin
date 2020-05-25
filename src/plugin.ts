import { IValidateRule, IRulePluginDefault } from '@berish/validate';
import { ruleDecorator } from './ruleDecorator';

const plugin: IRulePluginDefault<{}> = params => {
  return {
    upgradeRuleAfterInit: rule => {
      rule.decorator = ruleDecorator(rule);
      return rule;
    },
  };
};

export default plugin;
