import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FractionTerm, Term} from "../input.component";
import {InputEditableElement} from "../classes/input-editable-element";
import {InputTermDirective} from "../directives/input-term.directive";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrl: './fraction.component.css'
})
export class FractionComponent extends InputEditableElement{
  @Input()
  index!:number
  @Input()
  numeratorChildren!:Term[]
  @Input()
  denominatorChildren!:Term[]
  @ViewChild('numeratorComponent')
  numeratorComponent!:InputEditableElement
  @ViewChild('denominatorComponent')
  denominatorComponent!:InputEditableElement
  terms=[]
  @ViewChildren(InputTermDirective)
  renderedChars!:QueryList<InputTermDirective>

  // ngAfterViewInit() {
  //
  // }
}
