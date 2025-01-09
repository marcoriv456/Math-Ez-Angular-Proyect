import {EventEmitter, Injectable} from '@angular/core';
import {InputComponent} from "../../input.component";
import {Term} from "../../models/terms/term.model";
import {InputCharData} from "../../models/input-char-data.model";

@Injectable()
export class CharClickedNotifierService {
  charClicked=new EventEmitter<InputCharData>
}
