import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../char/char.component";
import {InputComponent, Term} from "../../input.component";
import {InputEditableElement} from "../../classes/input-editable-element";

@Injectable()
export class CaretPositioningService {
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
