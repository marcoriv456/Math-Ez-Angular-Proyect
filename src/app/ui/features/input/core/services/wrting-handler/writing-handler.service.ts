import { inject, Injectable } from '@angular/core';
import { FractionAdder } from '../../terms/adders/fraction/fraction-adder.helper';
import { ContextHandlerService } from '../context-handler/context-handler.service';
import { CaretHandlerService } from '../caret-handler/caret-handler.service';
import { CaretIndexService } from '../caret-index/caret-index.service';
import { TermAdder } from '../../models/term-adder.model';
import { ExponentAdder } from '../../terms/adders/exponent-adder.helper';
import { RootAdder } from '../../terms/adders/root-adder.class';
import { IndexedRootAdder } from '../../terms/adders/indexed-root-adder.helper';
import { ParenthesisAdder } from '../../terms/adders/parenthesis/parenthesis-adder.helper';
import { RecognizableFunctionsService } from '../recognizable-functions/recognizable-functions.service';
import { FunctionAdder } from '../../terms/adders/function/function-adder.helper';
import { OutsideTermRemover } from '../../terms/removers/outside/outside-term-remover.helper';
import { InsideTermRemover } from '../../terms/removers/inside/inside-term-remover.helper';
import { TermRemover } from '../../models/term-remover.model';
import { CtrlRemover } from '../../terms/removers/ctrl/ctrl-remover.helper';
import { InputEventBusService } from '../input-event-bus/input-event-bus.service';
import { KeyTypedEvent } from '../../models/events/io/key-typed.event';
import { TermSection } from '../../models/term-section.model';

@Injectable()
export class WritingHandlerService {
  private contextHandler = inject(ContextHandlerService);
  private caretHandler = inject(CaretHandlerService);
  private indexService = inject(CaretIndexService);
  private functionsService = inject(RecognizableFunctionsService);
  private eventBus = inject(InputEventBusService);

  constructor() {
    this.eventBus.on(KeyTypedEvent).subscribe((event) => this.handle(event));
  }

  private handle({ key, ctrlKey, altKey }: KeyTypedEvent) {
    if (key == 'Backspace') this.handleRemove(ctrlKey);
    else if (key.length == 1) this.handleAppend(key, ctrlKey, altKey);
  }

  private handleAppend(key: string, ctrlKey: boolean, altKey: boolean) {
    if (key == '/') this.appendFraction();
    else if (key == 'e' && ctrlKey) this.appendExponent();
    else if (key == 'r' && ctrlKey) this.appendRoot();
    else if (key == 'r' && altKey) this.appendIndexedRoot();
    else if (key == 'p' && ctrlKey) this.appendChar('π');
    else if (key == '(' || key == ')') this.appendParenthesis(key);
    else this.appendChar(key);
  }

  public handleRemove(ctrlKey: boolean) {
    if (this.caretIndex === -1 && this.currentElement.mathElement === null)
      return;

    if (this.caretIndex === -1) return this.removeFromInside();

    if (ctrlKey) return this.doCtrlRemove();

    return this.removeFromOutside();
  }

  private removeFromInside() {
    const container = this.currentElement;
    const mathElement = container.mathElement;
    const parent = mathElement.parent;
    const parentTerm = parent.terms[mathElement.index];

    const remover = new InsideTermRemover(
      container.terms,
      parentTerm,
      container.index,
      mathElement.index,
    );

    this.removeWith(remover, parent);
  }

  private removeFromOutside() {
    const remover = new OutsideTermRemover(
      this.currentElement.terms,
      this.caretIndex,
    );
    this.removeWith(remover, this.currentElement);
  }

  private doCtrlRemove() {
    const remover = new CtrlRemover(this.currentElement.terms, this.caretIndex);
    this.removeWith(remover, this.currentElement);
  }

  private removeWith(remover: TermRemover, element: TermSection) {
    const { index, count, remainingTerms, moveTo } = remover.remove();

    element.replace(index, count, ...(remainingTerms || []));
    this.caretHandler.move(
      element.getCharData(moveTo) || element.getNoCharData(),
    );
  }

  private appendChar(char: string) {
    this.currentElement.append(this.caretIndex + 1, { type: 'char', char });
    this.caretHandler.move(
      this.currentElement.getCharData(this.caretIndex + 1) ||
        this.currentElement.getNoCharData(),
    );
    this.lookForMathFunctionReferences();
  }

  private appendParenthesis(parenthesis: '(' | ')') {
    const adder = new ParenthesisAdder(
      this.caretIndex,
      this.currentElement.terms,
      parenthesis,
    );
    try {
      this.append(adder);
    } catch (matchingParenthesisNotFound) {
      this.appendChar(parenthesis);
    }
  }

  private appendIndexedRoot() {
    const adder = new IndexedRootAdder(this.caretIndex);
    this.append(adder);
  }

  private appendRoot() {
    const adder = new RootAdder(this.caretIndex);
    this.append(adder);
  }

  private appendExponent() {
    const adder = new ExponentAdder(this.caretIndex);
    this.append(adder);
  }

  private appendFraction() {
    const adder = new FractionAdder(this.currentElement.terms, this.caretIndex);
    this.append(adder);
  }

  private lookForMathFunctionReferences() {
    const adder = new FunctionAdder(
      this.currentElement.terms,
      this.functionsService.recognizableFunctions,
    );
    try {
      this.append(adder);
    } catch (error) {}
  }

  private append(adder: TermAdder) {
    const { term, replaceFrom, replaceCount, containerToMoveAt } = adder.add();
    this.currentElement.replace(replaceFrom, replaceCount, term);

    const moveAt = this.getPlaceToMoveAtAfterAddingATerm(
      replaceFrom,
      containerToMoveAt,
    );
    this.caretHandler.move(moveAt || this.currentElement.getLastCharData());
  }

  private getPlaceToMoveAtAfterAddingATerm(
    renderedElementIndex: number,
    sectionToMoveAt: number | 'outside',
  ) {
    if (sectionToMoveAt == 'outside')
      return this.currentElement.getCharData(renderedElementIndex);
    return this.currentElement
      .getElement(renderedElementIndex)
      ?.sectionAt(sectionToMoveAt)
      ?.getLastCharData();
  }

  private get currentElement() {
    return this.contextHandler.getCurrentElement();
  }

  private get caretIndex() {
    return this.indexService.index;
  }
}
