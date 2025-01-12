import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {LogarithmValidator} from "../../validation/validators/functions/logarithm.validator";

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css','../../assets/editable-elements-styles.css']
})
export class FunctionComponent extends InputEditableElement implements OnInit{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @Input()
  functionName!:string
  @ViewChild('functionNameLabel')
  functionNameLabel!:ElementRef
  @Input()
  baseTerms?:Term[]
  override editable=false
  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>;
  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars
  }
  @ViewChild('functionArgumentContainer')
  argumentContainer!:EditableTermContainerComponent
  @ViewChild('functionBaseComponent')
  baseComponent!:EditableTermContainerComponent

  ngOnInit() {
    switch (this.functionName){
      case "log":
        this.validatorClass=LogarithmValidator
    }
  }
}

