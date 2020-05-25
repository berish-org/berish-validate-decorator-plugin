import { createSimpleRule, usePlugin } from '@berish/validate';
import { ruleForm, plugin, validateMapClass } from '../';

usePlugin(plugin);

describe('check decorator plugin', () => {
  const isRequired = createSimpleRule({
    name: 'isRequired',
    conditionSync: ({ value }) => {
      if (value || value === 0) return true;
      return false;
    },
  });
  test('check decorator raw', () => {
    class A {
      // @ruleDecorator(isRequired)
      age: number;
    }

    // @ruleDecorator(isRequired)
    class C {
      @isRequired.decorator
      @ruleForm(A)
      public a: A;
    }

    const map = validateMapClass(C);
    console.log(map);
  });
});
