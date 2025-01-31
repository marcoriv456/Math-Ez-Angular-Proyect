import {ExponentValidator} from "../validators/exponent.validator";
import {ExponentComponent} from "../../components/exponent/exponent.component";
import {TermValidationData} from "../models/term-validation-data.model";
import {validTermValidation} from "../default-values/valid-term-validation";

describe("Exponent validator: ", () => {
  const getExponentComponent=(expValue:string)=>( {
      get toString(){
        return expValue
      }
    } as unknown as ExponentComponent)
  const getExponentValidatorOf = (expValue:string) => new ExponentValidator(getExponentComponent(expValue))
  const validData=validTermValidation

  it('Empty value is valid', () => {
    const validator=new ExponentValidator(getExponentComponent(''))

    const validationData = validator.validate()

    expect(validationData).toEqual(validData)
  });


  it('A not numerical value is valid', () => {
    const validator=getExponentValidatorOf('A+B')

    const validationData = validator.validate()

    expect(validationData).toEqual(validData)
  });

  it('One as value is partially invalid', () => {
    const validator=getExponentValidatorOf('1')

    const validationData = validator.validate()

    expect(validationData.isValid).toBeFalse()
    expect(validationData.type).toBe('partially-invalid')
    expect(validationData.messages.length).toBe(1)
  });

  it('Zero as value is partially invalid', () => {
    const validator=getExponentValidatorOf('0')

    const validationData= validator.validate()

    expect(validationData.isValid).toBeFalse()
    expect(validationData.type).toBe('partially-invalid')
    expect(validationData.messages.length).toBe(1)
  });
})
