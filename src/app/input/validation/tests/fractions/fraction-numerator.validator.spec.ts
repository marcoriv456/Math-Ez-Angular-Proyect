import {FractionChildComponent} from "../../../components/fraction/fraction-child/fraction-child.component";
import {FractionNumeratorValidator} from "../../validators/fraction/fraction-numerator.validator";
import {TermValidationData} from "../../models/term-validation-data.model";

describe('FractionNumeratorValidator: ', () => {
  const getNumeratorComponent = (numerator: string) => {
    return {
      get toString(): string {
        return numerator;
      }
    } as unknown as FractionChildComponent;
  };

  let validator: FractionNumeratorValidator;
  let validationData: TermValidationData;

  describe('Validator initializing: ', () => {
    it('should initialize the numerator value', () => {
      validator = new FractionNumeratorValidator(getNumeratorComponent('12'));
      expect(validator['numeratorValue']).toBe(12);
    });

    it('should initialize the numerator string value', () => {
      validator = new FractionNumeratorValidator(getNumeratorComponent('12'));
      expect(validator['numeratorStringValue']).toBe('12');
    });

    it('should not initialize the numerator value as NaN', () => {
      validator = new FractionNumeratorValidator(getNumeratorComponent('A+B'));
      expect(validator['numeratorValue']).toBeNaN();
    });

    it('should not initialize the numerator string value as empty if not provided', () => {
      validator = new FractionNumeratorValidator(getNumeratorComponent(''));
      expect(validator['numeratorStringValue']).toBe('');
    });
  });

  describe('Validation on invalid value: ', () => {
    it('should return an empty array if numerator is NaN', () => {
      validator = new FractionNumeratorValidator(getNumeratorComponent('A+B'));
      expect(validator['getValidationMessages']()).toEqual([]);
    });

    it('should not execute the validation if numerator is NaN', () => {
      validator = new FractionNumeratorValidator(getNumeratorComponent('A+B'));
      spyOn(validator as any, 'warnZeroAsNumerator');

      validator['getValidationMessages']();
      expect(validator['warnZeroAsNumerator']).not.toHaveBeenCalled();
    });
  });

  describe('Validation process: ', () => {
    describe('Given 0 as numerator value: ', () => {
      beforeEach(() => {
        validator = new FractionNumeratorValidator(getNumeratorComponent('0'));
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
          message: 'Cuando el numerador es 0, la fracción siempre resulta igual a 0.',
          type: 'partially-invalid',
        });
      });
    });

    describe('Given a valid numerator value: ', () => {
      beforeEach(() => {
        validator = new FractionNumeratorValidator(getNumeratorComponent('5'));
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

    describe('Given an empty numerator value: ', () => {
      beforeEach(() => {
        validator = new FractionNumeratorValidator(getNumeratorComponent(''));
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
