import { TermValidationData } from '../../models/term-validation-data.model';
import { expect } from 'chai';

export const expectInvalid = (validationData: TermValidationData) => {
  expect(validationData.isValid).to.be.false;
  expect(validationData.type).to.equal('fully-invalid');
  expect(validationData.messages.length).to.equal(1);
};
