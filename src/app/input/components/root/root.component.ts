import {Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {TermArgumentComponent} from "../term-argument/term-argument.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {RootValidator} from "../../validation/validators/root.validator";
import {
  InputNonEditableElement
} from "../../directives/input-non-editable-element/input-non-editable-element.directive";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css','../../assets/editable-elements-styles.css']
})
export class RootComponent extends InputNonEditableElement{
  @Input()
  radicalTerms?:Term[]

  @ViewChild('radicandComponent')
  radicandComponent!:EditableTermContainerComponent
  @ViewChild('indexComponent')
  indexComponent!:TermArgumentComponent

  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars;
  }
  override validatorClass=RootValidator
}

