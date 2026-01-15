import { Term } from './terms/term.model';
import { InputElementLocation } from './locations/input-element-location.model';
import { InputCharData } from './input-char-data.model';
import { InputMathElement } from '../abstracts/input-math-element.abstract';

export abstract class TermSection {
  abstract terms: Term[];
  abstract index: number;
  abstract centered: boolean;

  abstract selected: boolean;
  abstract size: number;
  abstract positionX: number;
  abstract clientY: number;

  abstract mathElement: InputMathElement<any>;

  abstract addChangesListener(callback: () => void): void;

  abstract append(from: number, ...terms: Term[]): void;

  abstract replace(from: number, deleteCount: number, ...terms: Term[]): void;

  abstract delete(from: number, deleteCount: number): void;

  abstract getCharData(index: number): InputCharData | undefined;

  abstract getNoCharData(): InputCharData; // Idem
  abstract getLastCharData(): InputCharData; // Idem

  abstract getTermLocation(index: number): InputElementLocation;

  abstract getElement(index: number): InputMathElement<any> | null | undefined;
}
