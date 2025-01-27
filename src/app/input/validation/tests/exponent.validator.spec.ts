import {ExponentValidator} from "../validators/exponent.validator";
import {ExponentComponent} from "../../components/exponent/exponent.component";
import {TermValidationData} from "../models/term-validation-data.model";

describe("Exponent validator: ", () => {
  const getExponentComponent=(expValue:string)=>{
    return {
      get toString(){
        return expValue
      }
    } as unknown as ExponentComponent
  }
  let validator:ExponentValidator
  describe('Validator initializing: ',()=>{
    it('should initialize the string value', () => {
      validator=new ExponentValidator(getExponentComponent('12'))


      expect(validator['stringValue']).toBe('12')
    });
    it('should initialize the value', () => {
      validator=new ExponentValidator(getExponentComponent('12'))

      expect(validator['value']).toBe(12)
    });


    it('should not initialize the number value', () => {
      validator=new ExponentValidator(getExponentComponent('A+B'))

      expect(validator['value']).toBeNaN()
    });

  })

  describe('Validation on invalid value: ',()=>{
    it('should return an empty array', () => {
      validator=new ExponentValidator(getExponentComponent('A+B'))

      expect(validator['getValidationMessages']()).toEqual([])
    });
    it('should not execute the validation', () => {
      validator=new ExponentValidator(getExponentComponent('A+B'))
      spyOn(validator as any, 'validateOneExponent')
      spyOn(validator as any, 'validateZeroExponent')

      expect(validator['validateOneExponent']).not.toHaveBeenCalled()
      expect(validator['validateZeroExponent']).not.toHaveBeenCalled()
    });
  })

  describe('Validation process: ', () => {
    let validationData:TermValidationData
    describe('Given 1 as value: ',()=>{
      beforeEach(()=>{
        validator=new ExponentValidator(getExponentComponent('1'))
        validationData=validator.validate()
      })

      it('should return "isValid" as false', () => {
        expect(validationData.isValid).toBeFalse()
      });

      it('should return "type" as "partially-invalid"', () => {
        expect(validationData.type).toBe('partially-invalid')
      });

      it('should return an array of one message ', () => {
        expect(validationData.messages.length).toBe(1)
      });

      it('should return the following message', () => {
        expect(validationData.messages[0]).toEqual({message:'Elevar a la potencia 1 es redundante.',type:'partially-invalid'})
      });
    })

    describe('Given 0 as value:', () => {
      beforeEach(()=>{
        validator=new ExponentValidator(getExponentComponent('0'))
        validationData=validator.validate()
      })

      it('should return "isValid" as false', () => {
        expect(validationData.isValid).toBeFalse()
      });

      it('should return "type" as "partially-invalid"', () => {
        expect(validationData.type).toBe('partially-invalid')
      });

      it('should return an array of one message ', () => {
        expect(validationData.messages.length).toBe(1)
      });

      it('should return the following message', () => {
        expect(validationData.messages[0]).toEqual({message:'Cualquier valor elevado a 0 es igual a 1.',type:'partially-invalid'})
      });

    });

    describe('Given an empty string as value', () => {
      beforeEach(()=>{
        validator=new ExponentValidator(getExponentComponent(''))
        validationData=validator.validate()
      })

      it('should return "isValid" as true', () => {
        expect(validationData.isValid).toBeTrue()
      });

      it('should not return nothing as "type"', () => {
        expect(validationData.type).not.toBeDefined()
      });

      it('should return an empty messages array ', () => {
        expect(validationData.messages.length).toBe(0)
      });
    })
  });
})
