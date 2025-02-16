import {TermValidationData} from "../../models/term-validation-data.model";
import {expect} from 'chai'

export const expectValid = (validationData:TermValidationData) =>{
  expect(validationData.isValid).to.be.true;
  expect(validationData.type).to.be.undefined;
  expect(validationData.messages.length).to.equal(0);
}
