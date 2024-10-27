import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class HomeService {

  constructor() { }
  homeInitialized=new EventEmitter()
}
