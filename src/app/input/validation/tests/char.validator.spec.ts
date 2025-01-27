import {CharValidator} from "../validators/char.validator";
import {configureTestbed} from "../../tests/config/configure-testbed.helper";
import {CharComponent} from "../../components/char/char.component";
import {TestBed} from "@angular/core/testing";
import {
  ExperimentalVariableProviderService
} from "../../input-testing-environment/experimental-variable-provider.service";
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";
import {TermValidationData} from "../models/term-validation-data.model";

describe('Char validator: ',()=>{
  let mockChar:CharComponent
  let validator:CharValidator

  const variableProvider=new VariableProviderService()
  variableProvider.setVariableProvider(new ExperimentalVariableProviderService())
  beforeEach(()=>{
    mockChar={char:'a',variableProvider}
    validator=new CharValidator(mockChar)
  })

  it('should initialize the invalid reference message with the char\' character', () => {
    expect(validator['invalidReferenceMessage']).toEqual({message:`No se reconoce a la variable "a"`,type:"fully-invalid"})
  });
  it('should initialize the variable provider', () => {
    expect(validator['variableProvider']).toBeDefined()
  });

  describe('Differentiating between letters and numbers: ',()=>{
    it('should call isCharALetter method', () => {
      spyOn(validator as any,'isCharALetter')

      validator.validate()

      expect(validator['isCharALetter']).toHaveBeenCalled()
    });



    describe('When the char is a letter: ',()=>{
      beforeEach(()=>{
        mockChar={char:'A',variableProvider}
        validator=new CharValidator(mockChar)
      })

      it('should recognize the char as a letter', () => {
        expect(validator['isCharALetter']()).toBeTrue()
      });

      it('should execute the validation', () => {
        spyOn(validator as any,'isVariableReferenceValid')
        validator.validate()

        expect(validator['isVariableReferenceValid']).toHaveBeenCalled()
      });
    })

    describe('When the char is not a letter: ',()=>{
      beforeEach(()=>{
        mockChar={char:'6',variableProvider}
        validator=new CharValidator(mockChar)
      })

      it('should recognize the char as not a letter', () => {
        expect(validator['isCharALetter']()).toBeFalse()
      });

      it('should not execute the validation', () => {
        spyOn(validator as any, 'isVariableReferenceValid')
        validator.validate()

        expect(validator['isVariableReferenceValid']).not.toHaveBeenCalled()
      });
    })
  })

  describe('Validation process:',()=>{
    let validationData:TermValidationData
    describe('Given an invalid character:',()=>{
      beforeEach(()=>{
        mockChar={char:'g',variableProvider}
        validator=new CharValidator(mockChar)
        validationData=validator.validate()
      })
      it('it should return "isValid" as false', () => {
        expect(validationData.isValid).toBeFalse()
      });

      it('should return a list of messages', () => {
        expect(validationData.messages).toBeTruthy()
      });

      it('should return only one message', () => {
        expect(validationData.messages.length).toBe(1)
      });

      it('should return "fully-invalid as the validation', () => {
        expect(validationData.type).toBe('fully-invalid')
      });
    })

    describe("Given a valid character:",()=>{
      beforeEach(()=>{
        mockChar={char:'A',variableProvider}
        validator=new CharValidator(mockChar)
        validationData=validator.validate()
      })

      it('should return "isValid" as true', () => {
        expect(validationData.isValid).toBeTrue()
      });

      it('should return an empty message list', () => {
        expect(validationData.messages.length).toBe(0)
      });

      it('should not return any type of invalidation', () => {
        expect(validationData.type).not.toBeDefined()
      });
    })

  })
})
