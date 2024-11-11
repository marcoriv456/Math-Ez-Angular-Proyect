import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FractionTerm, Term} from "../input.component";
import {InputEditableElement} from "../classes/input-editable-element";
import {InputTermDirective} from "../directives/input-term.directive";
import {CaretPositioningService} from "../services/caret-positioning/caret-positioning.service";

@Component({
  selector: 'frac',
  templateUrl: './fraction.component.html',
  styleUrl: './fraction.component.css'
})
export class FractionComponent extends InputEditableElement{
  @Input()
  index!:number
  @Input()
  numeratorChildren!:Term[]
  @Input()
  denominatorChildren!:Term[]
  @ViewChild('numeratorComponent')
  numeratorComponent!:InputEditableElement
  @ViewChild('denominatorComponent')
  denominatorComponent!:InputEditableElement
  @Input()
  terms:Term[]=[]
  @ViewChildren(InputTermDirective)
  renderedChars!:QueryList<InputTermDirective>
  @Input()
  parent!: InputEditableElement;
  ref=inject(ElementRef).nativeElement as HTMLElement;
  caretPositioningService=inject(CaretPositioningService)
  get position(): number {
    console.log('on fraction position: ',this.ref.getBoundingClientRect().left)
    return this.ref.getBoundingClientRect().left-this.caretPositioningService.inputPosition;
  }

  // ngAfterViewInit() {
  //
  // }
}
