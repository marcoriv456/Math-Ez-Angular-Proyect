import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {TermWarningMessageData} from "../../models/char-validation/warning-message-data.model";
import {WarningsService} from "../../services/warnings/warnings.service";
import {WarningRenderData} from "../../models/char-validation/warning-render-data.model";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'term-validation-warning',
  templateUrl: './term-validation-warning.component.html',
  styleUrl: './term-validation-warning.component.css',
  animations:[
    trigger('warning-animations',[
      transition(':enter',[
        style({transform:'translateY(-100%)',opacity:0}),
        animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(0)',opacity:1}))
      ]),
      transition(':leave',[
        animate('500ms cubic-bezier(0,0,0,1)',style({transform:'translateY(-100%)',opacity:0}))
      ]),

    ]),
  ]
})
export class TermValidationWarningComponent implements OnInit{
  protected showingWarning=false
  protected warningMessages:TermWarningMessageData[]=[]
  protected warningStyleData={ left:'50%', top:'0' }
  private warningsService=inject(WarningsService)
  private ref=inject(ElementRef).nativeElement as HTMLElement

  ngOnInit() {
    this.warningsService.showWarning.subscribe(this.showWarning.bind(this))
    this.warningsService.hideWarning.subscribe(this.hideWarning.bind(this))
  }

  private showWarning({messages,position}:WarningRenderData){
    this.showingWarning=true

    this.warningStyleData.left=position.x-this.ref.getBoundingClientRect().left + 'px'
    this.warningStyleData.top = position.y-this.ref.getBoundingClientRect().top + 'px'

    this.warningMessages=messages
  }

  private hideWarning(){
    this.showingWarning=false
  }
}
