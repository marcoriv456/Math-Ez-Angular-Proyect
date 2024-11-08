import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../char/char.component";
import {InputComponent} from "../../input.component";

@Injectable()
export class CaretPositioningService {
  charClicked=new EventEmitter<InputCharData>
  private inputRef!:InputComponent
  constructor() { }

  get inputPosition(){
    return this.inputRef.position
  }
  setInputRef(input:InputComponent){
    this.inputRef = input
  }
}
