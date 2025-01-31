import {CharValidator} from "../validators/char.validator";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {TermValidationData} from "../models/term-validation-data.model";
import {validTermValidation} from "../default-values/valid-term-validation";

describe('Char validator: ', () => {
  const variableProviderMock = {
    get variableNames() {
      return ['A', 'B', 'D']
    }
  } as VariableProviderService;
  const validData:TermValidationData = validTermValidation

  const getMockChar = (char: string) => ({char, variableProvider: variableProviderMock})
  const getCharValidatorOf = (char: string) => new CharValidator(getMockChar(char))

  it('Generates a message including the variable name', () => {
    const validator = getCharValidatorOf('g')

    const validationData = validator.validate()

    expect(validationData.messages[0].message.includes('"g"')).toBeTrue()
  });

  it('A not recognizable variable is invalid', () => {
    const validator = getCharValidatorOf('g')

    const validationData = validator.validate()

    expect(validationData.isValid).toBeFalse()
    expect(validationData.messages.length).toBe(1)
    expect(validationData.type).toBe('fully-invalid')
  });


  it('A number is valid ', () => {
    const validator = getCharValidatorOf('5')

    const validationData = validator.validate()

    expect(validationData).toEqual(validData)
  });

  it('An operand character is valid', () => {
    const validator = getCharValidatorOf('/')

    const validationData = validator.validate()

    expect(validationData).toEqual(validData)
  });
})
