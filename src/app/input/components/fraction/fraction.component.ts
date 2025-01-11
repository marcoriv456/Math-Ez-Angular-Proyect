import {Component, Input, QueryList, ViewChildren} from '@angular/core';
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {FractionValidator} from "../../validation/validators/fraction/fraction-validator";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrls: ['./fraction.component.css','../../assets/editable-elements-styles.css']
})
export class FractionComponent extends InputEditableElement{
  termContainer!: TermContainerComponent;

  @Input()
  numeratorChildren!:Term[]
  @Input()
  denominatorChildren!:Term[]
  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>
  override get renderedChars(){
    return this._renderedChars
  }
  override editable=false
  get numeratorComponent() {
    return this.renderedChars.get(0) as InputTermDirective
  }
  get denominatorComponent() {
    return this.renderedChars.get(1) as InputTermDirective
  }

  override validatorClass=FractionValidator
}
