import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {TermWarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {FractionComponent} from "../../../components/fraction/fraction.component";
import {validTermValidation} from "../../default-values/valid-term-validation";
import {TermValidationData} from "../../../models/char-validation/validation-data.model";

export class FractionValidator extends TermValidator{
  private readonly numeratorValue:number
  private readonly denominatorValue:number


  constructor(private fractionComponent: FractionComponent) {
    super();
    this.numeratorValue= +(fractionComponent.numeratorComponent.asEditableElement?.toString ||"")
    this.denominatorValue= +(fractionComponent.denominatorComponent.asEditableElement?.toString ||"")
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages=super.getValidationMessages()

    this.invalidateIndetermination(messages)

    return messages;
  }

  private invalidateIndetermination(messages:TermValidationMessage[]){
    if(this.numeratorValue==0 && this.denominatorValue==0){
      messages.push({message:"Dividir 0 sobre 0 da un resultado indeterminado.", type:'fully-invalid'})
      this.removeChildrenValidation()
    }
    else
      this.restoreChildrenValidation()
  }

  private restoreChildrenValidation(){
    const {numeratorComponent,denominatorComponent}=this.fractionComponent

    numeratorComponent.updateValidation()
    denominatorComponent.updateValidation()
  }

  private removeChildrenValidation(){
    const {numeratorComponent,denominatorComponent}=this.fractionComponent

    numeratorComponent.validationData=validTermValidation
    denominatorComponent.validationData=validTermValidation
  }

}
