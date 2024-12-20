import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrl: './function.component.css'
})
export class FunctionComponent extends InputEditableElement{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @Input()
  functionName!:string
  @ViewChild('functionNameLabel')
  functionNameLabel!:ElementRef

  @Input()
  argumentTerms?:Term[]

  override editable=false

  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>;
  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars
  }
  @ViewChild('functionMainContainer')
  mainContainer!:EditableTermContainerComponent
  @ViewChild('functionArgument')
  argumentComponent!:EditableTermContainerComponent
}

