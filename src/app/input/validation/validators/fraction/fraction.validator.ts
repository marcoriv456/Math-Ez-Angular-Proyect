import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {FractionComponent} from "../../../components/fraction/fraction.component";
import {validTermValidation} from "../../default-values/valid-term-validation";
import {TermValidationData} from "../../models/term-validation-data.model";
import {Term} from "../../../models/terms/term.model";
import {TermUtils} from "../../../classes/term-utils.util";
import {UnexpectedTermTypeError} from "../../errors/unexpected-term-type.error";

export class FractionValidator extends TermValidator{
  private readonly numeratorValue:number
  private readonly denominatorValue:number
  private readonly numeratorStringValue:string
  private readonly denominatorStringValue:string


  constructor(term: Term) {
    super();
    if(term.type!=='fraction')
      throw new UnexpectedTermTypeError("fraction",term.type)

    this.numeratorStringValue = TermUtils.toString(term.numeratorChildren)
    this.denominatorStringValue = TermUtils.toString(term.denominatorChildren)
    this.numeratorValue = +this.numeratorStringValue
    this.denominatorValue = +this.denominatorStringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages=super.getValidationMessages()

    this.invalidateIndetermination(messages)

    return messages;
  }

  private invalidateIndetermination(messages:TermValidationMessage[]) {
    if (this.numeratorValue == 0 && this.denominatorValue == 0 && this.numeratorStringValue !== '' && this.denominatorStringValue !== '')
      messages.push({message: "Dividir 0 sobre 0 da un resultado indeterminado.", type: 'fully-invalid'})

  }
}
