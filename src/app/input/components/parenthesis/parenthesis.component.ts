import {Component} from '@angular/core';
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {ParenthesisTerm} from "../../models/terms/parenthesis-term.model";

@Component({
  selector: 'parenthesis',
  templateUrl: './parenthesis.component.html',
  styleUrls: ['./parenthesis.component.css','../../assets/editable-elements-styles.css']
})
export class ParenthesisComponent extends InputMathElement<ParenthesisTerm>{ }
