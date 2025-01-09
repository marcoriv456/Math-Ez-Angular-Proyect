import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {AuxiliaryEditableElement} from "../../classes/auxiliar-editable-element.class";

@Component({
  selector: 'editable-term-container',
  templateUrl: './editable-term-container.component.html',
  styleUrls: ['./editable-term-container.component.css','../../assets/editable-elements-styles.css']
})
export class EditableTermContainerComponent extends AuxiliaryEditableElement{

}
