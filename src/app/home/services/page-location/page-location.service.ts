import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class PageLocationService {

  constructor() {}

  private pageLocationEmitter=new EventEmitter<string>();
  setPageLocation(pageLocation:string){
    this.pageLocationEmitter.emit(pageLocation);
  }

  addListener(callback:(location:string)=>void){
    this.pageLocationEmitter.subscribe(callback)
  }

}
