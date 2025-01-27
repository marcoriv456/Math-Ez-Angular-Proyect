import {FractionChildComponent} from "../../../components/fraction/fraction-child/fraction-child.component";
import {FractionDenominatorValidator} from "../../validators/fraction/fraction-denominator.validator";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {TermValidationData} from "../../models/term-validation-data.model";

describe('Fraction Denominator Validator: ', () => {
  const getDenominatorComponent = (denominator: string) => {
    return {
      get toString(): string {
        return denominator;
      }
    } as unknown as FractionChildComponent;
  };

  let validator: FractionDenominatorValidator;
  let validationData: TermValidationData;

  describe('Validator initializing: ', () => {
    it('should initialize the denominator value', () => {
      validator = new FractionDenominatorValidator(getDenominatorComponent('3'));
      expect(validator['denominatorValue']).toBe(3);
    });

    it('should initialize the denominator string value', () => {
      validator = new FractionDenominatorValidator(getDenominatorComponent('3'));
      expect(validator['denominatorStringValue']).toBe('3');
    });

    it('should not initialize the denominator value as NaN if it is a valid number', () => {
      validator = new FractionDenominatorValidator(getDenominatorComponent('5'));
      expect(validator['denominatorValue']).toBe(5);
    });

    it('should initialize the denominator value as NaN if not a valid number', () => {
      validator = new FractionDenominatorValidator(getDenominatorComponent('A+B'));
      expect(validator['denominatorValue']).toBeNaN();
    });
  });

  describe('Validation on invalid value: ', () => {
    beforeEach(()=>{
      validator = new FractionDenominatorValidator(getDenominatorComponent('A+B'));
    })

    it('should return an empty array if denominator is NaN', () => {
      expect(validator['getValidationMessages']()).toEqual([]);
    });

    it('should not execute validation if denominator is NaN', () => {
      spyOn(validator as any, 'warnOneAsDenominator');
      spyOn(validator as any, 'invalidateZeroAsDenominator');

      validator['getValidationMessages']();
      expect(validator['warnOneAsDenominator']).not.toHaveBeenCalled();
      expect(validator['invalidateZeroAsDenominator']).not.toHaveBeenCalled();
    });
  });

  describe('Validation process: ', () => {
    describe('Given 1 as denominator value: ', () => {
      beforeEach(() => {
        validator = new FractionDenominatorValidator(getDenominatorComponent('1'));
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
          message: 'Tener "1" como denominador es redundante.',
          type: 'partially-invalid',
        });
      });
    });

    describe('Given 0 as denominator value: ', () => {
      beforeEach(() => {
        validator = new FractionDenominatorValidator(getDenominatorComponent('0'));
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
          message: 'Cualquier division entre 0 esta indefinida.',
          type: 'fully-invalid',
        });
      });
    });

    describe('Given empty denominator value: ', () => {
      beforeEach(() => {
        validator = new FractionDenominatorValidator(getDenominatorComponent(''));
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

    describe('Given valid denominator values: ', () => {
      it('should return "isValid" as true for denominator 3', () => {
        validator = new FractionDenominatorValidator(getDenominatorComponent('3'));
        validationData = validator.validate();
        expect(validationData.isValid).toBeTrue();
        expect(validationData.messages.length).toBe(0);
      });

      it('should return "isValid" as true for denominator -5', () => {
        validator = new FractionDenominatorValidator(getDenominatorComponent('-5'));
        validationData = validator.validate();
        expect(validationData.isValid).toBeTrue();
        expect(validationData.messages.length).toBe(0);
      });
    });
  });
});
