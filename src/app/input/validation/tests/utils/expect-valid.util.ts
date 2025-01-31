import {TermValidationData} from "../../models/term-validation-data.model";
import {validTermValidation} from "../../default-values/valid-term-validation";

export const expectValid = (validationData:TermValidationData) =>expect(validationData).toEqual(validTermValidation)
