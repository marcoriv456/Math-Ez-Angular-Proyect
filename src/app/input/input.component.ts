import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, ViewChild,} from '@angular/core';
import {Term} from "./models/terms/term.model";
import {VariableHandlerService} from "./services/variable-handler/variable-handler.service";
import {EditableTermContainerComponent} from "./components/editable-term-container/editable-term-container.component";
import {CaretHandlerService} from "./services/caret-handler/caret-handler.service";
import {WritingHandlerService} from "./services/wrting-handler/writing-handler.service";
import {ContextHandlerService} from "./services/context-handler/context-handler.service";
import {adviceFadingAnimation} from "./animations/advice-fading.animation";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  host:{'[attr.tabindex]': '0'},
  animations:[adviceFadingAnimation]
})
export class InputComponent implements AfterViewInit{
  protected terms: Term[] = [];
  public readonly caretHandler=inject(CaretHandlerService)
  public readonly contextHandler=inject(ContextHandlerService)
  public readonly writingHandler=inject(WritingHandlerService)
  public readonly variableHandler=inject(VariableHandlerService)

  private readonly cdr=inject(ChangeDetectorRef)
  @ViewChild(EditableTermContainerComponent) private termContainer!: EditableTermContainerComponent;
  @ViewChild('overlay') private overlay!:ElementRef

  ngAfterViewInit() {
    this.contextHandler.setMainElement(this.termContainer)
    this.caretHandler.setInputOverlayRef(this.overlay)
  }

  setTerms(...terms:Term[]){
    this.terms = terms;
    this.cdr.detectChanges()
  }

  @HostListener('keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent) {
    let {key, ctrlKey, altKey} = event
    if (key !== 'Tab')
      event.preventDefault()
    if (key.length == 1)
      this.writingHandler.handleKey(key,ctrlKey,altKey)
    else if(key=='Backspace')
      this.writingHandler.handleRemove(ctrlKey)
    else
      this.caretHandler.handleKey(key,ctrlKey)
  }

  @HostListener('click')
  private onClick(){
    this.caretHandler.moveToLastInMain()
  }
}
