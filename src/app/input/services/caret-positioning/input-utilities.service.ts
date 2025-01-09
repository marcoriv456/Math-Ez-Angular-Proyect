import {EventEmitter, Injectable} from '@angular/core';
import {InputComponent} from "../../input.component";
import {InputEditableElement} from "../../classes/input-editable-element.class";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";

@Injectable()
export class InputUtilitiesService {
  charClicked=new EventEmitter<InputCharData>
  constructor() { }

}
