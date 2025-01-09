import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../models/input-char-data.model";
import {AuxiliaryEditableElement} from "../../classes/auxiliar-editable-element.class";

@Component({
  selector: 'argument',
  templateUrl: './term-argument.component.html',
  styleUrls: ['./term-argument.component.css','../../assets/editable-elements-styles.css']
})
export class TermArgumentComponent extends AuxiliaryEditableElement{

}
