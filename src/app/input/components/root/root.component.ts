import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputTermDirective} from "../../directives/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {RootMainContainerComponent} from "./root-main-container/root-main-container.component";
import {TermArgumentComponent} from "../term-argument/term-argument.component";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent extends InputEditableElement{
  @Input()
  parent!: InputEditableElement;
  @Input()
  index!:number;
  @Input()
  terms!:Term[];
  @ViewChildren(InputTermDirective)
  _renderedChars!:QueryList<InputTermDirective>

  termContainer!: TermContainerComponent;
  ref=inject(ElementRef).nativeElement as HTMLElement;
  inputUtilitiesService=inject(InputUtilitiesService);
  @ViewChild('rootSymbol')
  rootSymbol!:ElementRef;

  @Input()
  radicalTerms?:Term[]

  override get fontSize(): number {
    return super.fontSize*0.8;
  }
  @HostBinding('style.--font-size')
  override get fontSizeToBind(): string {
    return super.fontSizeToBind;
  }

  override get noCharData(): InputCharData {
    let noCharData= super.noCharData;
    noCharData.positionX+=this.rootSymbol.nativeElement.offsetWidth
    return noCharData
  }

  @ViewChild('rootMainContainer')
  mainComponent!:RootMainContainerComponent
  @ViewChild('rootArgument')
  radicalComponent!:TermArgumentComponent

  override get renderedChars(): QueryList<InputTermDirective> {
    return this._renderedChars;
  }
}

