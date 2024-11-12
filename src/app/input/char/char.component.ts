import { Component, Input } from '@angular/core';
import {InputEditableElement} from "../classes/input-editable-element";

@Component({
  selector: 'char',
  templateUrl: './char.component.html',
  styleUrl: './char.component.css'
})
export class CharComponent {
  @Input()
  char!:string
}
export type InputCharData={
  positionX:number
  positionY:number
  index:number
  size:number
  parent?:InputEditableElement
}
