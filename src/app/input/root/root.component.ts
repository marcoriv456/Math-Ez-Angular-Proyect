import {Component, ElementRef, HostBinding, inject, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputEditableElement} from "../models/input-editable-element.class";
import {InputUtilitiesService} from "../services/caret-positioning/input-utilities.service";
import {InputTermDirective} from "../directives/input-term.directive";
import {Term} from "../models/term.model";
import {InputCharData} from "../models/input-char-data.model";

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
  renderedChars!: QueryList<InputTermDirective>;
  ref=inject(ElementRef).nativeElement as HTMLElement;
  inputUtilitiesService=inject(InputUtilitiesService);

  @ViewChild('rootSymbol')
  rootSymbol!:ElementRef;

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

  override removeChar(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return super.removeChar(from, deleteCount);
    this.inputUtilitiesService.elementDeletedEmitter.emit({elementIndex:this.index,residualData:[]})
    return;
  }


}
