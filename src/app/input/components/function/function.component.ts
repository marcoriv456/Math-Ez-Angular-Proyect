import {Component} from '@angular/core';
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {FunctionTerm} from "../../models/terms/function-term.model";

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css','../../assets/editable-elements-styles.css']
})
export class FunctionComponent extends InputMathElement<FunctionTerm> {}

