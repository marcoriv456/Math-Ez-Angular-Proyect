import {expectValid} from "../../test/expect-valid.util";
import {expectPartiallyInvalid} from "../../test/expect-partially-invalid.util";
import {expectInvalid} from "../../test/expect-invalid.util";
import {LogarithmValidator} from "./logarithm.validator";
import {TermUtils} from "../../../../../classes/term-utils.util";

describe('Logarithm validator: ', () => {
  const getValidator = (base: string, argument: string,) => new LogarithmValidator({
    type: 'function',
    functionName: 'log',
    functionChildren: TermUtils.parse(argument),
    argumentTerms: TermUtils.parse(base)
  })

  it('Empty values are valid', () => {
    const validator = getValidator('', '')

    const validationData = validator.validate()

    expectValid(validationData)
  });

  describe('Base validation: ', () => {
    it('"10" as base is partially invalid', () => {
      const validator = getValidator('10', '15')

      const validationData = validator.validate()

      expectPartiallyInvalid(validationData)
    });

    it('"1" as base is invalid', () => {
      const validator = getValidator('1', '10')

      const validationData = validator.validate()

      expectInvalid(validationData)
    });

    it('"0" as base is invalid', () => {
      const validator = getValidator('0', '10')

      const validationData = validator.validate()

      expectInvalid(validationData)
    });


    it('Negative base is invalid', () => {
      const validator = getValidator('-10', '10')

      const validationData = validator.validate()

      expectInvalid(validationData)
    });
  })


  describe('Argument validation', () => {
    it('"0" as argument is invalid', () => {
      const validator = getValidator('2', '0')

      const validationData = validator.validate()

      expectInvalid(validationData)

    });

    it('Negative argument is invalid', () => {
      const validator = getValidator('2', '-10')

      const validationData = validator.validate()

      expectInvalid(validationData)
    });
  });

});
