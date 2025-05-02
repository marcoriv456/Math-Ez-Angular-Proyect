import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {InputCharData} from "../../../core/models/input-char-data.model";
import {EditableTermContainerComponent} from "../../molecules/editable-term-container/editable-term-container.component";
import {CaretHandlerService} from "../../../core/services/caret-handler/caret-handler.service";

@Component({
  selector: 'caret',
  templateUrl: './caret.component.html',
  styleUrl: './caret.component.css'
})
export class CaretComponent implements OnInit{
  protected style={ height:'0px', left:'0px', top:'0px' }
  private ref=inject(ElementRef).nativeElement as HTMLElement
  private handler=inject(CaretHandlerService)

  ngOnInit() {
    this.handler.listenMoves(data=>this.moveTo(data))
  }

  private moveTo({positionX,parent}:InputCharData){
    this.style.left=positionX+'px'
    this.style.height=parent.size+'px'
    this.style.top=parent.clientY-this.ref.getBoundingClientRect().top+'px'
  }
}
