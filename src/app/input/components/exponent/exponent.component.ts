import {Component, ViewChild} from '@angular/core';
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {ExponentValidator} from "../../validation/validators/exponent/exponent.validator";
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {ExponentTerm} from "../../models/terms/exponent-term";

@Component({
  selector: 'exp',
  templateUrl: './exponent.component.html',
  styleUrls: ['./exponent.component.css','../../assets/editable-elements-styles.css']
})
export class ExponentComponent extends InputMathElement<ExponentTerm>{ }
