import {Component, forwardRef} from '@angular/core';
import {InputMathElement} from "../../../directives/input-math-element/input-math-element.abstract";
import {ExponentTerm} from "../../../core/models/terms/exponent-term";

@Component({
  selector: 'exp',
  templateUrl: './exponent.component.html',
  styleUrls: ['./exponent.component.css','../../../assets/editable-elements-styles.css'],
  providers: [{provide:InputMathElement, useExisting:forwardRef(()=>ExponentComponent)}]
})
export class ExponentComponent extends InputMathElement<ExponentTerm>{ }
