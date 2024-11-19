import {EventEmitter, Injectable} from '@angular/core';
import {InputComponent} from "../../input.component";
import {InputEditableElement} from "../../models/input-editable-element.class";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";

@Injectable()
export class InputUtilitiesService {
  charClicked=new EventEmitter<InputCharData>
  elementDeletedEmitter=new EventEmitter<{ elementIndex:number,residualData:Term[] }>();
  private inputRef!:InputComponent
  constructor() { }

  get inputPositionX(){
    return this.inputRef.positionX
  }
  get inputPositionY(){
    return this.inputRef.ref.getBoundingClientRect().top
  }
  setInputRef(input:InputComponent){
    this.inputRef = input
  }

}
