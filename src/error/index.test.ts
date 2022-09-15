import { AbcError } from './index';
import { LogLevel, ModuleType } from './types';

test('error', () => {
  expect(new AbcError(ModuleType.Parse, 'test', LogLevel.Info)).toBeInstanceOf(
    AbcError
  );
});
