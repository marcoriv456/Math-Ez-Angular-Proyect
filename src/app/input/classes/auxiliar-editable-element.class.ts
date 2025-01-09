import {Directive, EventEmitter, Output, ViewChild} from "@angular/core";
import {TermContainerComponent} from "../components/term-container/term-container.component";
import {Term} from "../models/terms/term.model";
import {InputCharData} from "../models/input-char-data.model";
import {InputEditableElement} from "./input-editable-element.class";
import {from} from "rxjs";

@Directive()
export class AuxiliaryEditableElement extends InputEditableElement{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @Output()
  change=new EventEmitter();

  override append(from: number, deleteCount: number, ...term:Term[]) {
    super.append(from, deleteCount, ...term);
    this.change.emit()
  }

  override replace(from: number, deleteCount: number = 1, terms: Term[]) {
    super.replace(from, deleteCount, terms);
    this.change.emit()
  }
  override delete(from: number, deleteCount: number = 1) {
    super.delete(from, deleteCount);
    this.change.emit()
  }
}
