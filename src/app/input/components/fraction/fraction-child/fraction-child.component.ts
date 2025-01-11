import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Input, OnInit,
  Output,
  QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {InputCharData} from "../../../models/input-char-data.model";
import {TermContainerComponent} from "../../term-container/term-container.component";
import {TermWarningMessageData} from "../../../models/char-validation/warning-message-data.model";
import {InputEditableElement} from "../../../directives/input-editable-element/input-editable-element.directive";
import {FractionNumeratorValidator} from "../../../validation/validators/fraction/fraction-numerator.validator";
import {FractionDenominatorValidator} from "../../../validation/validators/fraction/fraction-denominator.validator";

@Component({
  selector: 'frac-child',
  templateUrl: './fraction-child.component.html',
  styleUrls: ['./fraction-child.component.css','../../../assets/editable-elements-styles.css']
})
export class FractionChildComponent extends InputEditableElement implements OnInit{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @Output()
  termDeleted=new EventEmitter<void>
  @Input()
  type!:'numerator'|'denominator'

  cdr=inject(ChangeDetectorRef)

  override get noCharData(): InputCharData {
    let data=super.noCharData
    this.cdr.detectChanges()
    data.positionX = this.terms.length==0 ?
      data.positionX+this.ref.offsetWidth/2 : (this.renderedChars.get(0)?.leftPosition||0)
    return data
  }

  ngOnInit() {
    this.validatorClass = this.type=="numerator" ? FractionNumeratorValidator : FractionDenominatorValidator
  }
}
