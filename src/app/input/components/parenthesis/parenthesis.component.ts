import {Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";

@Component({
  selector: 'parenthesis',
  templateUrl: './parenthesis.component.html',
  styleUrls: ['./parenthesis.component.css','../../assets/editable-elements-styles.css']
})
export class ParenthesisComponent extends InputEditableElement{
  @Input()
  terms!:Term[]
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;
  @Input()
  parent!:InputEditableElement
  @Input()
  index!:number
  ref=inject(ElementRef).nativeElement as HTMLElement
  inputUtilitiesService=inject(InputUtilitiesService)

  @ViewChild('leftParenthesis')
  leftParenthesis!:ElementRef
  protected override get positionX(): number {
    return super.positionX+this.leftParenthesis.nativeElement.offsetWidth;
  }
}
