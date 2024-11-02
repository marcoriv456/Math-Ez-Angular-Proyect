import {Component, Input} from '@angular/core';
import {FractionTerm, Term} from "../input.component";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrl: './fraction.component.css'
})
export class FractionComponent{
  @Input()
  index!:number
  @Input()
  numeratorChildren!:Term[]
  @Input()
  denominatorChildren!:Term[]

}
