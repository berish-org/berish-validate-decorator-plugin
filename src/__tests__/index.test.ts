import { createRule, usePlugin, createRuleFlag, createSimpleRule } from '@berish/validate';
import { ruleForm, plugin, getFormKeys, ruleDecorator } from '../';
import { getFormClass, SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY, getKeys, getRulesByKey } from '../decorate';
import { getValidateMapFromClass, getValidateMapFromInstance } from '../validateMap';
import { validateInstanceSync } from '../validateInstance';

usePlugin(plugin);

export const FLAG_IS_EMAIL_NOT_STRING = createRuleFlag('isEmailNotString');

export const isEmail = createRule({
  name: 'isEmail',
  conditionSync: ({ value }) => {
    if (typeof value !== 'string') return FLAG_IS_EMAIL_NOT_STRING;
    const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regexp.test(value);
  },
  errorText: ({ flag }) =>
    flag === FLAG_IS_EMAIL_NOT_STRING ? 'Значение не является строкой' : 'Некорректный email-адрес',
});

const isRequired = createRule({
  name: 'isRequired',
  conditionSync: ({ value }) => (value ? true : value === 0 ? true : false),
  errorText: () => ' Поле обязательно',
});

export const range = createSimpleRule<[number, number]>({
  name: 'range',
  conditionSync: obj => {
    const [minValue, maxValue] = obj.body;
    if (obj.value > maxValue) return `Значение должно быть меньше ${maxValue}`;
    if (obj.value < minValue) return `Значение должно быть больше ${minValue}`;
    return true;
  },
});

describe('check decorator plugin', () => {
  test('ruleForm & getFormKeys & getFormClass', () => {
    const rule1 = createRule({ name: 'rule1' });
    const rule2 = createRule({ name: 'rule2' });

    class A {}
    class B {}

    class C {
      @ruleForm(A)
      public a: A;

      @ruleForm(B)
      public b: B;

      @ruleForm(B)
      @ruleForm()
      public b2: B;

      @ruleForm()
      public empty: B;
    }

    expect(getFormKeys(C)).toEqual(['a', 'b', 'b2', 'empty']);
    expect(getFormClass(C, 'a')).toBe(A);
    expect(getFormClass(C, 'b')).toBe(B);
    expect(getFormClass(C, 'b2')).toBe(B);
    expect(getFormClass(C, 'empty')).toBe(SYMBOL_CONSTRUCTOR_FORM_KEY_EMPTY);
  });

  test('ruleDecorator & getKeys & getRules', () => {
    class A {
      @isRequired.decorator
      @isEmail.decorator
      public email: string;

      @ruleDecorator(isRequired, isEmail)
      public age: number;

      public lastName: string;

      @ruleForm(A)
      public testForm: A;
    }

    expect(getKeys(A)).toEqual(['email', 'age']);
    expect(getRulesByKey(A, 'email')).toEqual([isRequired, isEmail]);
    expect(getRulesByKey(A, 'age')).toEqual([isRequired, isEmail]);
    expect(getRulesByKey(A, 'lastname')).toEqual([]);
    expect(getRulesByKey(A, 'testForm')).toEqual([]);
  });

  test('getValidateMapFromClass simple', () => {
    class A {
      @isRequired.decorator
      @isEmail.decorator
      public email: string;

      @ruleDecorator(isRequired, isEmail)
      public age: number;

      public lastName: string;
    }

    const map = getValidateMapFromClass(A);
    expect(map).toEqual({
      email: [isRequired, isEmail],
      age: [isRequired, isEmail],
    });
  });

  test('getValidateMapFromClass ref simple', () => {
    class A {
      @isRequired.decorator
      public email: string;

      @isRequired.decorator
      public age: number;

      @ruleForm(A)
      @isRequired.decorator
      public testForm: A;
    }

    const map = getValidateMapFromClass(A);
    expect(map).toEqual({
      email: [isRequired],
      age: [isRequired],
      testForm: [[isRequired], { $$ref: [] }],
    });
  });

  test('getValidateMapFromClass ref hard', () => {
    class B {
      @ruleForm()
      lastA: A;
      @ruleForm()
      nextA: A;
    }
    class A {
      @isRequired.decorator
      public email: string;

      @isRequired.decorator
      public age: number;

      @ruleForm(B)
      @isRequired.decorator
      public testB: B;
    }

    expect(getValidateMapFromClass(A)).toEqual({
      email: [isRequired],
      age: [isRequired],
      testB: [
        [isRequired],
        {
          lastA: [],
          nextA: [],
        },
      ],
    });
  });

  test('getValidateMapFromInstance ref simple', () => {
    class A {
      @isRequired.decorator
      public email: string;

      @isRequired.decorator
      public age: number;

      @ruleForm(A)
      @isRequired.decorator
      public testForm: A;
    }

    const map = getValidateMapFromInstance(new A());
    expect(map).toEqual({
      email: [isRequired],
      age: [isRequired],
      testForm: [[isRequired], { $$ref: [] }],
    });
  });

  test('getValidateMapFromInstance ref hard', () => {
    class B {
      @ruleForm()
      lastA: A;
      @ruleForm(B)
      @isRequired.decorator
      lastB: B;
    }
    class A {
      @isRequired.decorator
      public email: string;

      @isRequired.decorator
      public age: number;

      @ruleForm(B)
      @isRequired.decorator
      public testB: B;
    }
    const a = new A();
    a.age = 12;
    a.email = '';
    a.testB = new B();
    a.testB.lastA = a;
    a.testB.lastB = null;

    expect(getValidateMapFromInstance(a)).toEqual({
      email: [isRequired],
      age: [isRequired],
      testB: [
        [isRequired],
        {
          lastA: { $$ref: [] },
          lastB: [[isRequired], { $$ref: ['testB'] }],
        },
      ],
    });
  });

  test('', () => {
    @(isEmail.revertSimple('notEmail').decorator)
    class UserInfo {
      public name: string;
      public lastname: string;

      @isRequired.decorator
      @(range(18, 100).decorator)
      public age: number;
    }

    class UserAuth {
      @isRequired.decorator
      @isEmail.decorator
      public login: string;
      public password: string;
    }

    class User {
      @isRequired.decorator
      public id: string;

      @ruleForm(UserInfo)
      public info: UserInfo;

      @ruleForm(UserAuth)
      public auth: UserAuth;
    }

    const auth = new UserAuth();
    auth.login = 'berishev@fartix.com';
    auth.password = 'myPassword123';

    const info = new UserInfo();
    info.name = 'Ravil';
    info.lastname = 'Berishev';
    info.age = 17;

    const user = new User();
    user.id = '123';
    user.info = info;
    user.auth = auth;

    const result = validateInstanceSync(user, true);
    expect(result).toEqual([
      {
        key: ['info', 'age'],
        rules: [{ name: range.ruleName, isValid: false, errorText: `Значение должно быть больше 18` }],
      },
    ]);
  });
});
