import {TermValidator} from "../../abstracts/validator.abstract";

export class FractionChildValidator extends TermValidator{
  protected validationControl=true

  public disableValidationControl(){
    this.validationControl=false
    this.validate()
  }

  public enableValidationControl(){
    this.validationControl=true
    this.validate()
  }
}
