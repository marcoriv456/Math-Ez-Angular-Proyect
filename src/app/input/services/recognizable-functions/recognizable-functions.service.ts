import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecognizableFunctionsService {

  constructor() { }
  private _recognizableFunctions=['sen','cos','tan','ln','log']

  public get recognizableFunctions(){
    return this._recognizableFunctions;
  }

}
