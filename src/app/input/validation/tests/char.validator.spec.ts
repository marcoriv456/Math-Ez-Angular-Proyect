import {CharValidator} from "../validators/char.validator";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {TermValidationData} from "../models/term-validation-data.model";

describe('Char validator: ', () => {
  const variableProviderMock = {
    get variableNames() {
      return ['A', 'B', 'D']
    }
  } as VariableProviderService;
  const validData:TermValidationData = {isValid: true, messages: [], type:undefined}

  const getMockChar = (char: string) => ({char, variableProvider: variableProviderMock})
  const getCharValidatorOf = (char: string) => new CharValidator(getMockChar(char))

  it('Generates a message including the name of the not recognizable variable', () => {
    const validator = getCharValidatorOf('g')

    const validationData = validator.validate()

    expect(validationData.messages[0].message.includes('g')).toBeTrue()
  });

  it('Given a not recognizable variable, returns an invalid validation', () => {
    const validator = getCharValidatorOf('g')

    const validationData = validator.validate()

    expect(validationData.isValid).toBeFalse()
    expect(validationData.messages.length).toBe(1)
    expect(validationData.type).toBe('fully-invalid')
  });


  it('Given a number, returns a positive validation ', () => {
    const validator = getCharValidatorOf('5')

    const validatorData = validator.validate()

    expect(validatorData).toEqual(validData)
  });

  it('Given an operand character, returns a positive validation', () => {
    const validator = getCharValidatorOf('/')

    const validatorData = validator.validate()

    expect(validatorData).toEqual(validData)
  });
})
