import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FooterObserverService {

  constructor() { }

  private subject=new Subject<'enter'|'exit'>()

  public emit(value:'enter'|'exit'){
    this.subject.next(value)
  }
  public subscribe(callback:(value:'enter'|'exit')=>void){
    this.subject.subscribe(callback)
  }
}
