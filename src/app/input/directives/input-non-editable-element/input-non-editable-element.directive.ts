import {Directive, QueryList, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../input-editable-element/input-editable-element.directive";
import {TermContainerComponent} from "../../components/term-container/term-container.component";
import {InputTermDirective} from "../input-term/input-term.directive";

@Directive()
export class InputNonEditableElement extends InputEditableElement{
  termContainer!: TermContainerComponent;

  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>;

  override editable=false
}
