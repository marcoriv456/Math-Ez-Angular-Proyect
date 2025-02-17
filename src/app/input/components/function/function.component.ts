import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {LogarithmValidator} from "../../validation/validators/functions/logarithm/logarithm.validator";
import {
  InputNonEditableElement
} from "../../directives/input-non-editable-element/input-non-editable-element.directive";

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css','../../assets/editable-elements-styles.css']
})
export class FunctionComponent extends InputNonEditableElement{
  @Input()
  functionName!:string
  @ViewChild('functionNameLabel')
  functionNameLabel!:ElementRef
  @Input()
  baseTerms?:Term[]
  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars
  }
  @ViewChild('functionArgumentContainer')
  argumentContainer!:EditableTermContainerComponent
  @ViewChild('functionBaseComponent')
  baseComponent!:EditableTermContainerComponent

}

