import {TermValidationData} from "../../models/term-validation-data.model";

export const expectInvalid = (validationData:TermValidationData) => {
  expect(validationData.isValid).toBeFalse();
  expect(validationData.type).toBe('fully-invalid');
  expect(validationData.messages.length).toBe(1);
}
