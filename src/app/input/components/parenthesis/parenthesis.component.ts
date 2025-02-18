import {AfterViewInit, Component, ElementRef, inject, Input, QueryList, ViewChild} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../models/input-char-data.model";
import {InputEditableElement} from "../../directives/input-editable-element/input-editable-element.directive";
import {
  InputNonEditableElement
} from "../../directives/input-non-editable-element/input-non-editable-element.directive";
import {InputTermDirective} from "../../directives/input-term/input-term.directive";
import {InputMathElement} from "../../directives/input-math-element/input-math-element.abstract";
import {ParenthesisTerm} from "../../models/terms/parenthesis-term.model";

@Component({
  selector: 'parenthesis',
  templateUrl: './parenthesis.component.html',
  styleUrls: ['./parenthesis.component.css','../../assets/editable-elements-styles.css']
})
export class ParenthesisComponent extends InputMathElement<ParenthesisTerm>{ }
