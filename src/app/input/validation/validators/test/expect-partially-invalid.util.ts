import {TermValidationData} from "../../models/term-validation-data.model";

export const expectPartiallyInvalid = (validationData:TermValidationData) => {
  expect(validationData.isValid).to.be.false;
  expect(validationData.type).to.equal('partially-invalid');
  expect(validationData.messages.length).to.equal(1);
}
