import { validators } from './validators';

describe('validators', () => {
  describe('required validator', () => {
    test('validate text', () => {
      expect(validators.required('text')).toBeNull();
    });

    test('validate empty text', () => {
      const errorMessage = 'error';
      expect(validators.required('', errorMessage)).toEqual(errorMessage);
    });

    test('validate zero', () => {
      expect(validators.required(0)).toBeNull();
    });

    test('validate null', () => {
      const errorMessage = 'error';
      expect(validators.required(null, errorMessage)).toEqual(errorMessage);
    });
  });
});
