import { Component, Input } from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";

@Component({
  selector: 'char',
  templateUrl: './char.component.html',
  styleUrl: './char.component.css'
})
export class CharComponent {
  @Input()
  char!:string
}

