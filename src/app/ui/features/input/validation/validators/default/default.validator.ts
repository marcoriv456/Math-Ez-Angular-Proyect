import {Term} from "../../../core/models/terms/term.model";
import {TermValidator} from "../../../core/validation/abstracts/validator.abstract";

export class DefaultValidator extends TermValidator{
  constructor(term:Term) {
    super();
  }
}
