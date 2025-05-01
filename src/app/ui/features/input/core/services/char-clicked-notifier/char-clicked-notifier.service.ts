import {Injectable} from '@angular/core';
import {InputCharData} from "../../../models/input-char-data.model";
import {Subject} from "rxjs";

@Injectable()
export class CharClickedNotifierService {
  private charClicked=new Subject<InputCharData>

  public notifyClick(data:InputCharData){
    this.charClicked.next(data)
  }

  public subscribe(callback:(data:InputCharData)=>void){
    this.charClicked.subscribe(callback)
  }
}
