import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {InputEditableElement} from "../../classes/input-editable-element.class";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputCharData} from "../../models/input-char-data.model";
import {AuxiliaryEditableElement} from "../../classes/auxiliar-editable-element.class";

@Component({
  selector: 'argument',
  templateUrl: './term-argument.component.html',
  styleUrls: ['./term-argument.component.css','../../assets/editable-elements-styles.css']
})
export class TermArgumentComponent extends AuxiliaryEditableElement{
  override remove(from: number, deleteCount: number = 1): InputCharData | undefined {
    return this.removeSimpleChar(from, deleteCount);
  }
}
