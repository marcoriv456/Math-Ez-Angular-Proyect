import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputCharData} from "../../models/input-char-data.model";
import {InputEditableElement} from "../../models/input-editable-element.class";

@Component({
  selector: 'parenthesis',
  templateUrl: './parenthesis.component.html',
  styleUrls: ['./parenthesis.component.css','../../assets/editable-elements-styles.css']
})
export class ParenthesisComponent extends InputEditableElement implements AfterViewInit{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @ViewChild('leftParenthesis')
  leftParenthesis!:ElementRef
  protected override get positionX(): number {
    return super.positionX+this.leftParenthesis.nativeElement.offsetWidth;
  }

  ngAfterViewInit() {
    this.updateValidation()
  }

  override remove(from: number, deleteCount: number = 1): InputCharData | undefined {
    if(this.caretIndex==-1)
      this.inputUtilitiesService.elementDeletedEmitter.emit({elementIndex:this.index, residualData:[...this.terms,{type:'char',char:')'}]})
    return super.remove(from, deleteCount);
  }
}
