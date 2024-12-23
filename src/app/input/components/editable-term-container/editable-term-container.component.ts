import {Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {InputEditableElement} from "../../models/input-editable-element.class";
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {InputUtilitiesService} from "../../services/caret-positioning/input-utilities.service";
import {InputCharData} from "../../models/input-char-data.model";

@Component({
  selector: 'editable-term-container',
  templateUrl: './editable-term-container.component.html',
  styleUrls: ['./editable-term-container.component.css','../../assets/editable-elements-styles.css']
})
export class EditableTermContainerComponent extends InputEditableElement{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;
  @Output()
  termDeleted=new EventEmitter<void>()
  override remove(from: number, deleteCount: number = 1): InputCharData|undefined {
    if(this.terms.length)
      return this.removeSimpleChar(from, deleteCount);
    this.termDeleted.emit()
    return;
  }

  @Output()
  change=new EventEmitter();

  override updateValidation() {
    super.updateValidation();
    this.change.emit()
  }
  protected override removeSimpleChar(from: number, deleteCount: number = 1): InputCharData | undefined {
    let data= super.removeSimpleChar(from, deleteCount);
    this.change.emit()
    return data
  }
}
