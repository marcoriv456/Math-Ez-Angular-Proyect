import {Term} from "../../../models/terms/term.model";
import {TermValidator} from "../../abstracts/validator.abstract";

export class DefaultValidator extends TermValidator{
  constructor(term:Term) {
    super();
  }
}
