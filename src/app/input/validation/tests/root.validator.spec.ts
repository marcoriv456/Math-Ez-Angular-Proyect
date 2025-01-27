import {RootComponent} from "../../components/root/root.component";
import {RootValidator} from "../validators/root.validator";
import {TermValidationData} from "../models/term-validation-data.model";

describe('Root validator: ', () => {
  const getRootComponent = (radicand: string, index?: string) => {
    return {
      indexComponent: index ? {
        get toString(): string {
          return index
        }
      }:undefined,
      radicandComponent:{
        get toString(): string {
          return radicand
        }
      }
    } as unknown as RootComponent
  }
  let validator: RootValidator;
  let validationData: TermValidationData;

  describe('Validator initializing: ', () => {
    it('should initialize the radicand value', () => {
      validator = new RootValidator(getRootComponent('12', '2'));
      expect(validator['radicandValue']).toBe(12);
    });

    it('should initialize the index value', () => {
      validator = new RootValidator(getRootComponent('12', '2'));
      expect(validator['indexValue']).toBe(2);
    });

    it('should initialize the index string value', () => {
      validator = new RootValidator(getRootComponent('12', '2'));
      expect(validator['indexStringValue']).toBe('2');
    });

    it('should not initialize the index value if not provided', () => {
      validator = new RootValidator(getRootComponent('12'));
      expect(validator['indexValue']).toBeNaN();
    });

    it('should not initialize the index string value if not provided', () => {
      validator = new RootValidator(getRootComponent('12'));
      expect(validator['indexStringValue']).toBeUndefined();
    });

    it('should not initialize the radicand value as NaN', () => {
      validator = new RootValidator(getRootComponent('A+B', '2'));
      expect(validator['radicandValue']).toBeNaN();
    });

    it('should not initialize the index value as NaN', () => {
      validator = new RootValidator(getRootComponent('12', 'A+B'));
      expect(validator['indexValue']).toBeNaN();
    });
  });

  describe('Validation on invalid value: ', () => {
    it('should return an empty array if radicand is NaN', () => {
      validator = new RootValidator(getRootComponent('A+B', '2'));
      expect(validator['getValidationMessages']()).toEqual([]);
    });

    it('should return an empty array if index is NaN', () => {
      validator = new RootValidator(getRootComponent('12', 'A+B'));
      expect(validator['getValidationMessages']()).toEqual([]);
    });

    it('should not execute the validation if radicand is NaN', () => {
      validator = new RootValidator(getRootComponent('A+B', '2'));
      spyOn(validator as any, 'validateRadicandValue');
      spyOn(validator as any, 'validateIndexValue');

      validator['getValidationMessages']();
      expect(validator['validateRadicandValue']).not.toHaveBeenCalled();
      expect(validator['validateIndexValue']).toHaveBeenCalled();
    });

    it('should not execute the validation if index is NaN', () => {
      validator = new RootValidator(getRootComponent('12', 'A+B'));
      spyOn(validator as any, 'validateRadicandValue');
      spyOn(validator as any, 'validateIndexValue');

      validator['getValidationMessages']();
      expect(validator['validateRadicandValue']).toHaveBeenCalled();
      expect(validator['validateIndexValue']).not.toHaveBeenCalled();
    });
  });

  describe('Validation process: ', () => {
    describe('Given 1 as radicand value: ', () => {
      beforeEach(() => {
        validator = new RootValidator(getRootComponent('1', '2'));
        validationData = validator.validate();
      });

      it('should return "isValid" as false', () => {
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
          message: 'La raiz de cualquier indice de 1 siempre sera 1.',
          type: 'partially-invalid',
        });
      });
    });

    describe('Given negative radicand and even index: ', () => {
      beforeEach(() => {
        validator = new RootValidator(getRootComponent('-4', '2'));
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
          message: 'La raiz de un numero negativo con indice par dara un numero complejo.',
          type: 'fully-invalid',
        });
      });
    });

    describe('Given 1 as index value: ', () => {
      beforeEach(() => {
        validator = new RootValidator(getRootComponent('4', '1'));
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
          message: 'No se puede agregar 1 como indice de una raiz.',
          type: 'fully-invalid',
        });
      });
    });

    describe('Given 0 as index value: ', () => {
      beforeEach(() => {
        validator = new RootValidator(getRootComponent('4', '0'));
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
          message: 'No se puede agregar 0 como indice de una raiz.',
          type: 'fully-invalid',
        });
      });
    });

    describe('Given empty index value: ', () => {
      beforeEach(() => {
        validator = new RootValidator(getRootComponent('4', ''));
        validationData = validator.validate();
      });

      it('should return "isValid" as true', () => {
        expect(validationData.isValid).toBeTrue();
      });

      it('should not return anything as "type"', () => {
        expect(validationData.type).not.toBeDefined();
      });

      it('should return an empty messages array', () => {
        expect(validationData.messages.length).toBe(0);
      });
    });
  });

});
