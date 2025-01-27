import {FunctionComponent} from "../../../components/function/function.component";
import {FractionComponent} from "../../../components/fraction/fraction.component";
import {InputTermDirective} from "../../../directives/input-term/input-term.directive";
import {InputEditableElement} from "../../../directives/input-editable-element/input-editable-element.directive";
import {FractionValidator} from "../../validators/fraction/fraction-validator";
import {TermValidationData} from "../../models/term-validation-data.model";
import {validTermValidation} from "../../default-values/valid-term-validation";

describe('Fraction validator: ', () => {
  const getFractionComponent:(...args:any[])=>FractionComponent = (numerator: string, denominator: string) => {
    return {
      get numeratorComponent(): InputTermDirective {
        return {
          get asEditableElement(): InputEditableElement | undefined {
            return {
              get toString(): string {
                return numerator
              }
            } as InputEditableElement
          },
          validationData: {isValid:true, messages:[]},
          updateValidation:jasmine.createSpy('updateValidation')
        } as unknown as InputTermDirective
      },

      get denominatorComponent(): InputTermDirective {
        return {
          get asEditableElement(): InputEditableElement | undefined {
            return {
              get toString(): string {
                return denominator
              }
            } as InputEditableElement
          },
          validationData: {isValid:true, messages:[]},
          updateValidation:jasmine.createSpy('updateValidation')
        } as unknown as InputTermDirective
      },

    } as FractionComponent
  }

  let validator: FractionValidator;
  let validationData: TermValidationData;

  describe('Validator initializing: ', () => {
    it('should initialize the numerator value', () => {
      validator = new FractionValidator(getFractionComponent('3', '4'));
      expect(validator['numeratorValue']).toBe(3);
    });

    it('should initialize the denominator value', () => {
      validator = new FractionValidator(getFractionComponent('3', '4'));
      expect(validator['denominatorValue']).toBe(4);
    });

    it('should initialize the numerator string value', () => {
      validator = new FractionValidator(getFractionComponent('3', '4'));
      expect(validator['numeratorStringValue']).toBe('3');
    });

    it('should initialize the denominator string value', () => {
      validator = new FractionValidator(getFractionComponent('3', '4'));
      expect(validator['denominatorStringValue']).toBe('4');
    });

    it('should not initialize the numerator value as NaN', () => {
      validator = new FractionValidator(getFractionComponent('A+B', '4'));
      expect(validator['numeratorValue']).toBeNaN();
    });

    it('should not initialize the denominator value as NaN', () => {
      validator = new FractionValidator(getFractionComponent('3', 'A+B'));
      expect(validator['denominatorValue']).toBeNaN();
    });
  });

  describe('Validation process: ', () => {
    describe('Given numerator and denominator are 0: ', () => {
      beforeEach(() => {
        const fractionComponent = getFractionComponent('0', '0');
        validator = new FractionValidator(fractionComponent);
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
          message: 'Dividir 0 sobre 0 da un resultado indeterminado.',
          type: 'fully-invalid',
        });
      });

      it('should not validate the children components', () => {
        expect(validator['fractionComponent'].numeratorComponent.updateValidation).not.toHaveBeenCalled();
        expect(validator['fractionComponent'].denominatorComponent.updateValidation).not.toHaveBeenCalled();
      });

      it('should set children validation data as valid', () => {
        expect(validator['fractionComponent'].numeratorComponent.validationData).toEqual(validTermValidation);
        expect(validator['fractionComponent'].denominatorComponent.validationData).toEqual(validTermValidation);
      });
    });

    describe('Given numerator and denominator are not 0: ', () => {
      let fractionComponent:FractionComponent;
      beforeEach(() => {
        fractionComponent = getFractionComponent('3', '4');
        validator = new FractionValidator(fractionComponent);
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

      it('should validate the children components', () => {
        expect(fractionComponent.numeratorComponent.validationData).toEqual(validTermValidation);
        expect(fractionComponent.denominatorComponent.validationData).toEqual(validTermValidation);
      });
    });

    describe('Given numerator or denominator is NaN: ', () => {
      it('should return "isValid" as true if numerator is NaN', () => {
        validator = new FractionValidator(getFractionComponent('A+B', '4'));
        validationData = validator.validate();
        expect(validationData.isValid).toBeTrue();
      });

      it('should return "isValid" as true if denominator is NaN', () => {
        validator = new FractionValidator(getFractionComponent('3', 'A+B'));
        validationData = validator.validate();
        expect(validationData.isValid).toBeTrue();
      });

      it('should return an empty messages array if numerator is NaN', () => {
        validator = new FractionValidator(getFractionComponent('A+B', '4'));
        validationData = validator.validate();
        expect(validationData.messages.length).toBe(0);
      });

      it('should return an empty messages array if denominator is NaN', () => {
        validator = new FractionValidator(getFractionComponent('3', 'A+B'));
        validationData = validator.validate();
        expect(validationData.messages.length).toBe(0);
      });
    });
  });
});
