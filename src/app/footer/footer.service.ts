import {ElementRef, EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  constructor() { }
  footerRef!: ElementRef;
  footerInitialized=new EventEmitter();
}
