import {Component, forwardRef} from '@angular/core';
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {ParenthesisTerm} from "../../models/terms/parenthesis-term.model";

@Component({
  selector: 'parenthesis',
  templateUrl: './parenthesis.component.html',
  styleUrls: ['./parenthesis.component.css','../../assets/editable-elements-styles.css'],
  providers: [{provide:InputMathElement, useExisting:forwardRef(()=>ParenthesisComponent)}]
})
export class ParenthesisComponent extends InputMathElement<ParenthesisTerm>{ }
