import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  Optional,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import { TermContainerComponent } from '../../atoms/term-container/term-container.component';
import { Term } from '../../../core/models/terms/term.model';
import { InputMathElement } from '../../../core/abstracts/input-math-element.abstract';
import { Subject } from 'rxjs';
import { ContainerLocation } from '../../../core/models/locations/container-location.model';
import { InputElementLocation } from '../../../core/models/locations/input-element-location.model';
import { InputCharData } from '../../../core/models/input-char-data.model';
import { InputEventBusService } from '../../../core/services/input-event-bus/input-event-bus.service';
import { CharClickedEvent } from '../../../core/models/events/io/char-clicked.event';
import { TermSection } from '../../../core/models/term-section.model';

@Component({
  selector: 'editable-term-container',
  templateUrl: './editable-term-container.component.html',
  styleUrls: [
    './editable-term-container.component.css',
    '../../assets/editable-elements-styles.css',
  ],
  providers: [
    {
      provide: TermSection,
      useExisting: forwardRef(() => EditableTermContainerComponent),
    },
  ],
})
export class EditableTermContainerComponent extends TermSection {
  @Input() terms!: Term[];
  @Input() index!: number;
  @Input() centered!: boolean;

  @ViewChild(TermContainerComponent)
  private termContainer!: TermContainerComponent;

  constructor(
    @SkipSelf() @Optional() public mathElement: InputMathElement<any>,
  ) {
    super();
  }

  private readonly changeEmitter = new Subject<void>();
  private readonly ref = inject(ElementRef).nativeElement as HTMLElement;
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly eventBus = inject(InputEventBusService);

  @HostBinding('class.selected') public selected = false;
  @HostBinding('class.empty')
  private get isEmpty() {
    return this.terms && this.terms.length == 0;
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    event.stopPropagation();
    this.eventBus.emit(new CharClickedEvent(this.getLastCharData()));
  }

  public addChangesListener(callback: () => void) {
    this.changeEmitter.subscribe(callback);
  }

  public append(from: number, ...terms: Term[]) {
    this.terms.splice(from, 0, ...terms);
    this.refresh();
    this.emitChange();
  }

  public replace(from: number, deleteCount = 1, ...terms: Term[]) {
    this.terms.splice(from, deleteCount, ...terms);
    this.refresh();
    this.emitChange();
  }

  public delete(from: number, deleteCount = 1) {
    this.terms.splice(from, deleteCount);
    this.refresh();
    this.emitChange();
  }

  public getCharData(index: number) {
    return this.termContainer.renderedChars.get(index)?.data;
  }

  public getNoCharData() {
    let positionX = this.positionX;
    if (this.centered) positionX = this.centeredCaretPosition();

    return { index: -1, positionX, parent: this };
  }

  private centeredCaretPosition() {
    const firstCharLeftPosition =
      this.termContainer.renderedChars.get(0)?.leftPosition;
    if (firstCharLeftPosition !== undefined) return firstCharLeftPosition;
    return this.positionX + this.ref.offsetWidth / 2;
  }

  public getLastCharData() {
    return (
      this.getCharData(this.termContainer.renderedChars.length - 1) ||
      this.getNoCharData()
    );
  }

  public get size(): number {
    return this.ref.offsetHeight;
  }

  public get positionX(): number {
    let parent = this.ref.parentElement;
    let leftPosition = this.ref.offsetLeft;
    while (parent && !(parent.tagName == 'APP-INPUT')) {
      leftPosition += parent.offsetLeft;
      parent = parent.parentElement;
    }
    return leftPosition;
  }

  public get clientY(): number {
    return this.ref.getBoundingClientRect().top;
  }

  private get location(): ContainerLocation {
    return (
      this.mathElement?.getContainerLocation(this.index) || { isThisMain: true }
    );
  }

  public getTermLocation(index: number): InputElementLocation {
    return {
      character: {
        prev: this.terms[index - 1]?.type,
        actual: this.terms[index]?.type,
        next: this.terms[index + 1]?.type,
      },
      container: this.location,
    };
  }

  public getElement(index: number) {
    return this.termContainer.renderedChars.get(index)?.asMathElement;
  }

  private refresh() {
    this.cdr.detectChanges();
  }

  private emitChange() {
    this.changeEmitter.next();
  }
}
