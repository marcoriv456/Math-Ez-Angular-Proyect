import { Term } from "../models/terms/term.model";
import { InputElementLocation } from "../models/locations/input-element-location.model";
import {InputCharData} from "../models/input-char-data.model";
import {InputMathElement} from "./input-math-element.abstract";

export abstract class EditableTermContainer {
  abstract terms: Term[];
  abstract index: number;
  abstract centered: boolean;
  abstract selected: boolean;

  abstract readonly mathElement: InputMathElement<any>;
  abstract readonly noCharData: InputCharData;
  abstract readonly lastCharData: InputCharData;
  abstract readonly size: number;
  abstract readonly positionX: number;
  abstract readonly clientY: number;

  abstract getTermLocation(index: number): InputElementLocation;
  abstract addChangesListener(callback: () => void): void;
  abstract append(from: number, ...terms: Term[]): void;
  abstract replace(from: number, deleteCount: number, ...terms: Term[]): void;
  abstract delete(from: number, deleteCount: number): void;
  abstract getCharData(index: number): InputCharData|undefined;
  abstract getElement(index: number): InputMathElement<any>|null|undefined;
}
