import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../char/char.component";
import {InputComponent} from "../../input.component";

@Injectable()
export class CaretPositioningService {
  charClicked=new EventEmitter<InputCharData>
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
