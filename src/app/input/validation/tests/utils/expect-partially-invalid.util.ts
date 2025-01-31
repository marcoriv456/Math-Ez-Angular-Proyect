import {TermValidationData} from "../../models/term-validation-data.model";

export const expectPartiallyInvalid = (validationData:TermValidationData) => {
  expect(validationData.isValid).toBeFalse();
  expect(validationData.type).toBe('partially-invalid');
  expect(validationData.messages.length).toBe(1);
}
