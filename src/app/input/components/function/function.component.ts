import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {FunctionMainContainerComponent} from "./function-main-container/function-main-container.component";

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrl: './function.component.css'
})
export class FunctionComponent extends InputEditableElement{
  @Input()
  index!: number;
  inputUtilitiesService=inject(InputUtilitiesService);
  ref=inject(ElementRef).nativeElement as HTMLElement
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;
  @Input()
  terms!: Term[];
  @Input()
  parent!:InputEditableElement

  @Input()
  functionName!:string
  @ViewChild('functionNameLabel')
  functionNameLabel!:ElementRef

  @Input()
  argumentTerms?:Term[]

  override editable=false
  override get fontSize(): number {
    return super.fontSize*0.8;
  }

  @HostBinding('style.--font-size')
  override get fontSizeToBind(): string {
    return super.fontSizeToBind;
  }

  @HostBinding('style.--parent-font-size')
  get parentFontSize(){
    return super.fontSize+'rem'
  }
  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>;
  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars
  }
  @ViewChild('functionMainContainer')
  mainContainer!:FunctionMainContainerComponent
}

