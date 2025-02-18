import {Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {EditableTermContainerComponent} from "../editable-term-container/editable-term-container.component";
import {TermArgumentComponent} from "../term-argument/term-argument.component";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {RootValidator} from "../../validation/validators/root/root.validator";
import {
  InputNonEditableElement
} from "../../directives/input-non-editable-element/input-non-editable-element.directive";
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {RootTerm} from "../../models/terms/root-term.model";

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css','../../assets/editable-elements-styles.css']
})
export class RootComponent extends InputMathElement<RootTerm>{ }

