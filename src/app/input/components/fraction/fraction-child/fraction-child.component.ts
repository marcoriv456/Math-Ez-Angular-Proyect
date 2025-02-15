import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FractionNumeratorValidator} from "../../../validation/validators/fraction/fraction-numerator.validator";
import {FractionDenominatorValidator} from "../../../validation/validators/fraction/fraction-denominator.validator";
import {AuxiliaryEditableElement} from "../../../classes/auxiliar-editable-element.class";

@Component({
  selector: 'frac-child',
  templateUrl: './fraction-child.component.html',
  styleUrls: ['./fraction-child.component.css','../../../assets/editable-elements-styles.css']
})
export class FractionChildComponent extends AuxiliaryEditableElement{
  @Input()
  type!:'numerator'|'denominator'

  override get positionX(){
    if(this.terms.length==0)
      return super.positionX+this.ref.offsetWidth/2
    return this.renderedChars.get(0)?.leftPosition||0
  }
}
