import {Component, inject, Input} from '@angular/core';
import {VariableProviderService} from "../../services/variable-provider/variable-provider.service";

@Component({
  selector: 'char',
  templateUrl: './char.component.html',
  styleUrl: './char.component.css'
})
export class CharComponent{
  @Input()
  public char!:string
  public variableProvider=inject(VariableProviderService)
}

