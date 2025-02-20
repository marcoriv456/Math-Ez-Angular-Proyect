import {Component, ElementRef, inject} from '@angular/core';
import {InputCharData} from "../../models/input-char-data.model";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";

@Component({
  selector: 'caret',
  templateUrl: './caret.component.html',
  styleUrl: './caret.component.css'
})
export class CaretComponent {
  protected style={ height:'0px', left:'0px', top:'0px' }
  private ref=inject(ElementRef).nativeElement as HTMLElement

  public moveTo({positionX}:InputCharData){
    this.style.left=positionX+'px'
  }

  public context(element:EditableTermContainerComponent){
    this.style.height=element.size+'px'
    this.style.top=element.clientY-this.ref.getBoundingClientRect().top+'px'
  }
}
