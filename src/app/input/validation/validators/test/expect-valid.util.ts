import {TermValidationData} from "../../models/term-validation-data.model";
import {validTermValidation} from "../../default-values/valid-term-validation";

export const expectValid = (validationData:TermValidationData) =>{
  expect(validationData.isValid).to.be.true;
  expect(validationData.type).to.be.undefined;
  expect(validationData.messages.length).to.equal(0);
}
