import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";

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
  get renderedChars(){
    return this.termContainer.renderedChars
  }


  @Input()
  functionName!:string
  @ViewChild('functionNameLabel')
  functionNameLabel!:ElementRef

  override get fontSize(): number {
    return super.fontSize*0.8;
  }

  @HostBinding('style.--font-size')
  override get fontSizeToBind(): string {
    return super.fontSizeToBind;
  }

  override get noCharData(): InputCharData {
    let noCharData= super.noCharData;
    noCharData.positionX+=this.functionNameLabel.nativeElement.offsetWidth
    return noCharData
  }

  @HostBinding('style.--parent-font-size')
  get parentFontSize(){
    return super.fontSize+'rem'
  }
}

