import { RootValidator } from './root.validator';
import { TermUtils } from '../../../utils/term-utils.util';
import { expectValid } from '../test/expect-valid.util';
import { expectPartiallyInvalid } from '../test/expect-partially-invalid.util';
import { expectInvalid } from '../test/expect-invalid.util';

describe('Root validator: ', () => {
  const getRootValidator = (radicand: string, base: string) =>
    new RootValidator({
      type: 'root',
      rootChildren: TermUtils.parse(radicand),
      radicalTerms: TermUtils.parse(base),
    });

  it('Empty index and radicand are valid', () => {
    const validator = getRootValidator('', '');

    const validationData = validator.validate();

    expectValid(validationData);
  });

  it('Not numerical index and radicand are valid', () => {
    const validator = getRootValidator('', '');

    const validationData = validator.validate();

    expectValid(validationData);
  });

  it('"1" as radicand is partially invalid', () => {
    const validator = getRootValidator('1', '');

    const validationData = validator.validate();

    expectPartiallyInvalid(validationData);
  });

  it('"0" as index is invalid', () => {
    const validator = getRootValidator('', '0');

    const validationData = validator.validate();

    expectInvalid(validationData);
  });

  it('"1" as index is invalid', () => {
    const validator = getRootValidator('', '1');

    const validationData = validator.validate();

    expectInvalid(validationData);
  });

  it('Negative radicand and even index are invalid', () => {
    const validator = getRootValidator('-10', '2');

    const validationData = validator.validate();

    expectInvalid(validationData);
  });
});
