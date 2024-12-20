import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {TermArgumentComponent} from "../term-argument/term-argument.component";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent extends InputEditableElement{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>

  @Input()
  radicalTerms?:Term[]

  override editable=false

  @ViewChild('rootMainContainer')
  mainComponent!:EditableTermContainerComponent
  @ViewChild('rootArgument')
  argumentComponent!:TermArgumentComponent

  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars;
  }
}

