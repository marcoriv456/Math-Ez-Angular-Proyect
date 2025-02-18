import {Component} from '@angular/core';
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {RootTerm} from "../../models/terms/root-term.model";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css','../../assets/editable-elements-styles.css']
})
export class RootComponent extends InputMathElement<RootTerm>{ }

