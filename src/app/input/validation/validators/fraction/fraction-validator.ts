import {TermValidator} from "../../abstracts/validator.abstract";
import {TermValidationMessage} from "../../models/term-validation-message.model";
import {FractionComponent} from "../../../components/fraction/fraction.component";
import {validTermValidation} from "../../default-values/valid-term-validation";
import {TermValidationData} from "../../models/term-validation-data.model";

export class FractionValidator extends TermValidator{
  private readonly numeratorValue:number
  private readonly denominatorValue:number
  private readonly numeratorStringValue:string
  private readonly denominatorStringValue:string


  constructor(private fractionComponent: FractionComponent) {
    super();
    this.numeratorStringValue = (fractionComponent.numeratorComponent.asEditableElement?.toString ||"")
    this.denominatorStringValue = (fractionComponent.denominatorComponent.asEditableElement?.toString ||"")
    this.numeratorValue = +this.numeratorStringValue
    this.denominatorValue = +this.denominatorStringValue
  }

  protected override getValidationMessages(): TermValidationMessage[] {
    let messages=super.getValidationMessages()

    this.invalidateIndetermination(messages)

    return messages;
  }

  private invalidateIndetermination(messages:TermValidationMessage[]){
    if(this.numeratorValue==0 && this.denominatorValue==0 && this.numeratorStringValue!=='' && this.denominatorStringValue!==''){
      messages.push({message:"Dividir 0 sobre 0 da un resultado indeterminado.", type:'fully-invalid'})
      this.removeChildrenValidation()
    }
    else
      this.restoreChildrenValidation()
  }

  private restoreChildrenValidation(){
    
  }

  private removeChildrenValidation(){

  }

}
