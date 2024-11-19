import {EventEmitter, Injectable} from '@angular/core';
import {InputCharData} from "../../char/char.component";

@Injectable()
export class WarningsService {

  constructor() { }
  showWarning=new EventEmitter<{messages:string[],position:InputCharData}>()
  hideWarning=new EventEmitter<void>()
}
