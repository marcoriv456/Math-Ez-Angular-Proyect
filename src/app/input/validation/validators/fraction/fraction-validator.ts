import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {TermWarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {FractionComponent} from "../../../components/fraction/fraction.component";

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
      this.disableFractionChildValidators()
    }else{
      this.enableFractionChildValidators()
    }

  }


  private disableFractionChildValidators(){
    // let {numeratorComponent,denominatorComponent}=this.fractionComponent


  //   hacer algo como numeratorcomponent.validator as fraction validator .disable validation control
  }

  private enableFractionChildValidators(){
  //   hacer algo como numeratorcomponent.validator as fraction validator .disable validation control
  }
}
