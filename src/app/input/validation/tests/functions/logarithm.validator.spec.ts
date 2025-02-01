import {FunctionComponent} from "../../../components/function/function.component";
import {LogarithmValidator} from "../../validators/functions/logarithm.validator";
import {TermValidationData} from "../../models/term-validation-data.model";
import {expectInvalid} from "../utils/expect-invalid.util";
import {expectPartiallyInvalid} from "../utils/expect-partially-invalid.util";
import {expectValid} from "../utils/expect-valid.util";

describe("Logarithm validator: ", () => {

  const getFunctionComponent = (base: string, argument: string) => ({
    baseComponent: {
      get toString(): string {
        return base
      }
    },
    argumentContainer: {
      get toString(): string {
        return argument
      }
    }
  }) as unknown as FunctionComponent

  const getValidator = (base: string, argument: string,) => new LogarithmValidator(getFunctionComponent(base, argument))


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
