import {Component, forwardRef} from '@angular/core';
import {InputMathElement} from "../../../directives/input-math-element/input-math-element.abstract";
import {RootTerm} from "../../../core/models/terms/root-term.model";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css','../../../assets/editable-elements-styles.css'],
  providers: [{provide:InputMathElement, useExisting:forwardRef(()=>RootComponent)}]
})
export class RootComponent extends InputMathElement<RootTerm>{ }

