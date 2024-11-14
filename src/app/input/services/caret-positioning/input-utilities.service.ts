import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../char/char.component";
import {InputComponent} from "../../input.component";
import {InputEditableElement} from "../../models/input-editable-element.class";
import {Term} from "../../models/term.model";

@Injectable()
export class InputUtilitiesService {
  charClicked=new EventEmitter<InputCharData>
  fractionDeleted=new EventEmitter<{ fractionIndex:number,residualData:Term[] }>();
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
