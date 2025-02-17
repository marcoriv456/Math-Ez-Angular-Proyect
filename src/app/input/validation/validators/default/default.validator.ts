import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {Term} from "../../../models/terms/term.model";

export class DefaultValidator extends TermValidator{
  constructor(term:Term) {
    super();
  }
}
