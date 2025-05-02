import {Component, forwardRef} from '@angular/core';
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {FunctionTerm} from "../../core/models/terms/function-term.model";

@Component({
  selector: 'function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css','../../assets/editable-elements-styles.css'],
  providers: [{provide:InputMathElement, useExisting:forwardRef(()=>FunctionComponent)}]
})
export class FunctionComponent extends InputMathElement<FunctionTerm> {}

