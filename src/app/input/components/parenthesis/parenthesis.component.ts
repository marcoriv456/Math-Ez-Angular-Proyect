import {AfterViewInit, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {Term} from "../../models/terms/term.model";
import {TermContainerComponent} from "../term-container/term-container.component";
import {CharClickedNotifierService} from "../../services/char-clicked-notifier/char-clicked-notifier.service";
import {InputCharData} from "../../models/input-char-data.model";
import {InputEditableElement} from "../../classes/input-editable-element.class";

@Component({
  selector: 'parenthesis',
  templateUrl: './parenthesis.component.html',
  styleUrls: ['./parenthesis.component.css','../../assets/editable-elements-styles.css']
})
export class ParenthesisComponent extends InputEditableElement implements AfterViewInit{
  @ViewChild(TermContainerComponent)
  termContainer!: TermContainerComponent;

  @ViewChild('leftParenthesis')
  leftParenthesis!:ElementRef
  protected override get positionX(): number {
    return super.positionX+this.leftParenthesis.nativeElement.offsetWidth;
  }

  ngAfterViewInit() {
    this.updateValidation()
  }
}
