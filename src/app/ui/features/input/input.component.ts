import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, inject, ViewChild,} from '@angular/core';
import {Term} from "./core/models/terms/term.model";
import {VariableHandlerService} from "./core/services/variable-handler/variable-handler.service";
import {EditableTermContainerComponent} from "./ui/molecules/editable-term-container/editable-term-container.component";
import {CaretHandlerService} from "./core/services/caret-handler/caret-handler.service";
import {WritingHandlerService} from "./core/services/wrting-handler/writing-handler.service";
import {ContextHandlerService} from "./core/services/context-handler/context-handler.service";
import {adviceFadingAnimation} from "./ui/animations/advice-fading.animation";
import {KeyTypedEvent} from "./core/models/events/io/key-typed.event";
import {InputEventBusService} from "./core/services/input-event-bus/input-event-bus.service";

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
  private readonly writingHandler =inject(WritingHandlerService)
  public readonly variableHandler=inject(VariableHandlerService)
  private readonly cdr=inject(ChangeDetectorRef)
  private readonly eventBus = inject(InputEventBusService)

  @ViewChild('overlay') private overlay!:ElementRef

  ngAfterViewInit() {
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
    this.eventBus.emit(new KeyTypedEvent(key,ctrlKey,altKey))
  }

  @HostListener('click')
  private onClick(){
    this.caretHandler.moveToLastInMain()
  }
}
