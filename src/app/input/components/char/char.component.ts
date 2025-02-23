import {Component, inject, Input} from '@angular/core';
import {VariableHandlerService} from "../../services/variable-handler/variable-handler.service";

@Component({
  selector: 'char',
  templateUrl: './char.component.html',
  styleUrl: './char.component.css'
})
export class CharComponent{
  @Input()
  public char!:string
  public variableProvider=inject(VariableHandlerService)
}

