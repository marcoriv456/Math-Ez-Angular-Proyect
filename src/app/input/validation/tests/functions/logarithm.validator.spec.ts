import {FunctionComponent} from "../../../components/function/function.component";
import {LogarithmValidator} from "../../validators/functions/logarithm.validator";
import {TermValidationData} from "../../models/term-validation-data.model";

describe("Logarithm validator: ", () => {

  const getFunctionComponent:(...args:any[])=>FunctionComponent = (base: string, argument: string) => {
    return {

      baseComponent: {
        get toString(): string {
          return base
        }
      },
      argumentContainer:{
        get toString(): string {
          return argument
        }
      }
    } as unknown as FunctionComponent
  }


  let validator: LogarithmValidator;
  let validationData: TermValidationData;

  describe('Validator initializing: ', () => {
    it('should initialize the base value', () => {
      validator = new LogarithmValidator(getFunctionComponent('2', '8'));
      expect(validator['baseValue']).toBe(2);
    });

    it('should initialize the argument value', () => {
      validator = new LogarithmValidator(getFunctionComponent('2', '8'));
      expect(validator['argumentValue']).toBe(8);
    });

    it('should initialize the base string value', () => {
      validator = new LogarithmValidator(getFunctionComponent('2', '8'));
      expect(validator['baseStringValue']).toBe('2');
    });

    it('should initialize the argument string value', () => {
      validator = new LogarithmValidator(getFunctionComponent('2', '8'));
      expect(validator['argumentStringValue']).toBe('8');
    });

    it('should not initialize the base value as NaN', () => {
      validator = new LogarithmValidator(getFunctionComponent('A+B', '8'));
      expect(validator['baseValue']).toBeNaN();
    });

    it('should not initialize the argument value as NaN', () => {
      validator = new LogarithmValidator(getFunctionComponent('2', 'A+B'));
      expect(validator['argumentValue']).toBeNaN();
    });
  });

  describe('Validation on invalid value: ', () => {
    it('should return an empty array if base is NaN', () => {
      validator = new LogarithmValidator(getFunctionComponent('A+B', '8'));
      expect(validator['getValidationMessages']()).toEqual([]);
    });

    it('should return an empty array if argument is NaN', () => {
      validator = new LogarithmValidator(getFunctionComponent('2', 'A+B'));
      expect(validator['getValidationMessages']()).toEqual([]);
    });

    it('should not execute the validation if base is NaN', () => {
      validator = new LogarithmValidator(getFunctionComponent('A+B', '8'));
      spyOn(validator as any, 'validateBase');
      spyOn(validator as any, 'validateArgument');

      validator['getValidationMessages']();
      expect(validator['validateBase']).not.toHaveBeenCalled();
      expect(validator['validateArgument']).toHaveBeenCalled();
    });

    it('should not execute the validation if argument is NaN', () => {
      validator = new LogarithmValidator(getFunctionComponent('2', 'A+B'));
      spyOn(validator as any, 'validateBase');
      spyOn(validator as any, 'validateArgument');

      validator['getValidationMessages']();
      expect(validator['validateBase']).toHaveBeenCalled();
      expect(validator['validateArgument']).toHaveBeenCalled();
    });
  });

  describe('Validation process: ', () => {
    describe('Given base less than or equal to 1: ', () => {
      beforeEach(() => {
        validator = new LogarithmValidator(getFunctionComponent('1', '8'));
        validationData = validator.validate();
      });

      it('should return "isValid" as false', () => {
        expect(validationData.isValid).toBeFalse();
      });

      it('should return "type" as "fully-invalid"', () => {
        expect(validationData.type).toBe('fully-invalid');
      });

      it('should return an array of one message', () => {
        expect(validationData.messages.length).toBe(1);
      });

      it('should return the following message', () => {
        expect(validationData.messages[0]).toEqual({
          message: 'La base de un logaritmo debe de ser un numero positivo distinto de 1.',
          type: 'fully-invalid',
        });
      });
    });

    describe('Given argument less than 0: ', () => {
      beforeEach(() => {
        validator = new LogarithmValidator(getFunctionComponent('2', '-8'));
        validationData = validator.validate();
      });

      it('should return "isValid" as false', () => {
        expect(validationData.isValid).toBeFalse();
      });

      it('should return "type" as "fully-invalid"', () => {
        expect(validationData.type).toBe('fully-invalid');
      });

      it('should return an array of one message', () => {
        expect(validationData.messages.length).toBe(1);
      });

      it('should return the following message', () => {
        expect(validationData.messages[0]).toEqual({
          message: 'Los logarimos con argumentos negativos devuelven numeros complejos.',
          type: 'fully-invalid',
        });
      });
    });

    describe('Given argument equal to 0: ', () => {
      beforeEach(() => {
        validator = new LogarithmValidator(getFunctionComponent('2', '0'));
        validationData = validator.validate();
      });

      it('should return "isValid" as false', () => {
        expect(validationData.isValid).toBeFalse();
      });

      it('should return "type" as "fully-invalid"', () => {
        expect(validationData.type).toBe('fully-invalid');
      });

      it('should return an array of one message', () => {
        expect(validationData.messages.length).toBe(1);
      });

      it('should return the following message', () => {
        expect(validationData.messages[0]).toEqual({
          message: 'No existe exponente que genere 0.',
          type: 'fully-invalid',
        });
      });
    });

    describe('Given base equal to 10: ', () => {
      beforeEach(() => {
        validator = new LogarithmValidator(getFunctionComponent('10', '8'));
        validationData = validator.validate();
      });

      it('should return "isValid" as true', () => {
        expect(validationData.isValid).toBeFalse();
      });

      it('should return "type" as "partially-invalid"', () => {
        expect(validationData.type).toBe('partially-invalid');
      });

      it('should return an array of one message', () => {
        expect(validationData.messages.length).toBe(1);
      });

      it('should return the following message', () => {
        expect(validationData.messages[0]).toEqual({
          message: 'Aun si no se especifica, 10 es el valor por defecto de la base de un logaritmo.',
          type: 'partially-invalid',
        });
      });
    });

    describe('Given empty base or argument: ', () => {
      it('should return "isValid" as true if base is empty', () => {
        validator = new LogarithmValidator(getFunctionComponent('', '8'));
        validationData = validator.validate();
        expect(validationData.isValid).toBeTrue();
      });

      it('should return "isValid" as true if argument is empty', () => {
        validator = new LogarithmValidator(getFunctionComponent('2', ''));
        validationData = validator.validate();
        expect(validationData.isValid).toBeTrue();
      });

      it('should return an empty messages array if base is empty', () => {
        validator = new LogarithmValidator(getFunctionComponent('', '8'));
        validationData = validator.validate();
        expect(validationData.messages.length).toBe(0);
      });

      it('should return an empty messages array if argument is empty', () => {
        validator = new LogarithmValidator(getFunctionComponent('2', ''));
        validationData = validator.validate();
        expect(validationData.messages.length).toBe(0);
      });
    });
  });
});
